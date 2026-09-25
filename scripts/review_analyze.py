#!/usr/bin/env python3
import argparse, json, os, re, sqlite3, unicodedata, urllib.request
from datetime import datetime, timezone
from pathlib import Path

DB=Path(os.getenv("REVIEW_DB_PATH","/data/reviews.sqlite3"))
ROOT=Path(os.getenv("REVIEW_CONTENT_ROOT","/content"))
URL=os.getenv("REVIEW_LLM_URL","")
KEY=os.getenv("REVIEW_LLM_API_KEY","")
MODEL=os.getenv("REVIEW_LLM_MODEL","")

def db():
    c=sqlite3.connect(DB); c.row_factory=sqlite3.Row; return c

def slug(s):
    s=unicodedata.normalize("NFKD",s.lower())
    s="".join(x for x in s if not unicodedata.combining(x))
    s=re.sub(r"[^a-z0-9\s-]","",s).strip()
    return re.sub(r"-+","-",re.sub(r"\s+","-",s)).strip("-") or "section"

def body(text):
    text=text.replace("\r\n","\n").replace("\r","\n")
    if text.startswith("---\n"):
        end=text.find("\n---\n",4)
        if end>=0: return text[end+5:].lstrip("\n")
    return text

def section(text,wanted):
    lines=body(text).splitlines(); used={}; heads={}; fence=False
    for i,line in enumerate(lines):
        if line.startswith(chr(96)*3): fence=not fence; continue
        if fence: continue
        m=re.match(r"^(#{1,6})\s+(.+)$",line)
        if not m: continue
        name=re.sub(r"[*_~]","",m.group(2))
        base=slug(name); used[base]=used.get(base,0)+1
        aid=base if used[base]==1 else f"{base}-{used[base]}"
        heads[i]=(len(m.group(1)),aid)
    start=None; level=None
    for i,(lev,aid) in heads.items():
        if aid==wanted: start=i; level=lev; break
    if start is None: return "\n".join(lines)[:12000]
    end=len(lines)
    for i in sorted(x for x in heads if x>start):
        if heads[i][0]<=level: end=i; break
    return "\n".join(lines[start:end])[:12000]

def article(report):
    idx=json.loads((ROOT/"content-index.json").read_text())
    item=next((x for x in idx["files"] if x.get("id")==report["article_id"] and (x.get("language") or "pl")==report["language"]),None)
    if not item: raise RuntimeError("article not found")
    text=(ROOT/item["path"]).read_text()
    return item,section(text,report["section_id"])

def ask(prompt):
    if not URL or not KEY or not MODEL: raise RuntimeError("LLM env is not configured")
    payload={"model":MODEL,"messages":[{"role":"system","content":"Return strict JSON only."},{"role":"user","content":prompt}],"temperature":0.1}
    req=urllib.request.Request(URL,data=json.dumps(payload).encode(),headers={"Authorization":"Bearer "+KEY,"Content-Type":"application/json"},method="POST")
    with urllib.request.urlopen(req,timeout=60) as r:
        out=json.loads(r.read().decode())
    raw=out["choices"][0]["message"]["content"].strip()
    if raw.startswith(chr(96)*3):
        raw=raw.split("\n",1)[1].rsplit(chr(96)*3,1)[0].strip()
    result=json.loads(raw)
    if result.get("verdict") not in ("confirmed","likely","unclear","not_confirmed"): raise RuntimeError("bad verdict")
    return result

def prompt(r,a,s):
    return f"""Review this technical correction report. Return JSON only with keys verdict, summary, suggested_fix, needs_external_verification, confidence. verdict must be confirmed, likely, unclear, or not_confirmed. Do not invent facts. If changing facts require outside checking, needs_external_verification=true. Write summary/fix in {r['language']}.
ARTICLE {r['article_id']} {a.get('title','')} {r['route']}
REASON {r['reason']} TARGET {r['target_type']} SECTION {r['section_id']} INDEX {r['block_index']}
SNAPSHOT:
{r['text_snapshot']}
CURRENT SECTION:
{s}"""

def run(conn,r):
    now=datetime.now(timezone.utc).isoformat().replace("+00:00","Z")
    try:
        a,s=article(r); result=ask(prompt(r,a,s))
        conn.execute("UPDATE reports SET analysis_status='done',analysis_result=?,analysis_model=?,analyzed_at=?,analysis_error=NULL WHERE id=?",(json.dumps(result,ensure_ascii=False),MODEL,now,r["id"]))
        print(f"{r['id']}: {result['verdict']} ({result.get('confidence','?')})")
        print("  "+result.get("summary",""))
    except Exception as e:
        conn.execute("UPDATE reports SET analysis_status='error',analysis_model=?,analyzed_at=?,analysis_error=? WHERE id=?",(MODEL or None,now,str(e)[:2000],r["id"]))
        print(f"{r['id']}: ERROR {e}")

def main():
    p=argparse.ArgumentParser(); p.add_argument("--id"); p.add_argument("--limit",type=int,default=50); p.add_argument("--reanalyze",action="store_true"); a=p.parse_args()
    where=["status='open'"]; params=[]
    if a.id: where.append("id=?"); params.append(a.id)
    elif not a.reanalyze: where.append("(analysis_status IS NULL OR analysis_status='error')")
    params.append(a.limit)
    with db() as c:
        rows=c.execute("SELECT * FROM reports WHERE "+" AND ".join(where)+" ORDER BY created_at LIMIT ?",params).fetchall()
        if not rows: print("No reports to analyze."); return
        for r in rows: run(c,r)

if __name__=="__main__": main()
