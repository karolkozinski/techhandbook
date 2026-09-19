# html-email-edm

## 1. Dlaczego email HTML jest inny

Email HTML nie działa jak nowoczesna strona WWW.

Klientami są m.in.:

- Outlook,
- Gmail,
- Apple Mail,
- aplikacje mobilne,
- webmaile.

Każdy ma inne ograniczenia.

Dlatego email wymaga bardziej konserwatywnego HTML i CSS.

## 2. Layout oparty na tabelach

Wciąż najbezpieczniejszy wzorzec:

```html
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
  <tr>
    <td align="center">
      <table role="presentation" width="600">
        <tr>
          <td>Treść</td>
        </tr>
      </table>
    </td>
  </tr>
</table>
```

## 3. Szerokość

Klasyczny content width:

```text
600–640 px
```

Na mobile kontener powinien się skalować.

## 4. Inline CSS

Wiele styli warto umieszczać inline:

```html
<td style="font-family: Arial, sans-serif; font-size: 16px;">
```

Nie wszystkie klienty zachowują pełne style z `<style>`.

## 5. Reset

Email często potrzebuje podstawowego resetu:

```css
body {
  margin: 0;
  padding: 0;
}

table {
  border-collapse: collapse;
}
```

## 6. role="presentation"

Tabele layoutowe powinny mieć:

```html
role="presentation"
```

Dzięki temu czytnik ekranu nie interpretuje ich jako danych tabelarycznych.

## 7. Obrazy

Zawsze:

- pełny URL,
- `alt`,
- width/height,
- styl blokowy tam, gdzie potrzebne.

Przykład:

```html
<img
  src="https://example.com/banner.png"
  width="600"
  alt="Opis"
  style="display:block; width:100%; max-width:600px; height:auto; border:0;"
>
```

## 8. Formaty obrazów

Najbezpieczniejsze:

- JPEG,
- PNG,
- GIF.

Nowocześniejsze formaty mogą mieć gorsze wsparcie w części klientów.

Jeśli kompatybilność jest krytyczna, testuj realne klienty.

## 9. Outlook

Desktopowy Outlook historycznie korzystał z silników o ograniczonym wsparciu CSS.

Typowe problemy:

- marginesy,
- background images,
- border radius,
- flex/grid,
- wysokości linii,
- skalowanie obrazów.

Nie projektuj emaila jak zwykłej strony.

## 10. Przyciski

Najbezpieczniej budować CTA jako link w komórce tabeli.

Przykład:

```html
<table role="presentation">
  <tr>
    <td bgcolor="#111111" style="padding:14px 22px;">
      <a href="https://example.com"
         style="color:#ffffff; text-decoration:none; display:inline-block;">
        Zobacz więcej
      </a>
    </td>
  </tr>
</table>
```

## 11. Bulletproof buttons

Jeżeli Outlook wymaga bardzo dokładnego odwzorowania przycisku, stosuje się bardziej rozbudowane fallbacki, czasem z VML.

Używaj ich tylko, gdy naprawdę potrzebujesz.

## 12. Media queries

Część klientów wspiera media queries.

Przykład:

```css
@media screen and (max-width: 620px) {
  .container {
    width: 100% !important;
  }
}
```

Projekt powinien być rozsądny także wtedy, gdy media query nie zadziała.

## 13. Responsive email

Dobre praktyki:

- jedna kolumna na małych ekranach,
- duże CTA,
- min. 16 px dla tekstu,
- obrazy max-width:100%,
- rozsądne paddingi.

## 14. Dark mode

Klient może:

- odwrócić kolory,
- zmienić tło,
- zmienić tekst,
- pozostawić część grafiki bez zmian.

Testuj kombinacje.

## 15. Background images

Wsparcie jest nierówne.

Jeżeli tło jest ważne dla treści, zapewnij:

- fallback color,
- czytelny tekst bez obrazu.

## 16. Linki

Używaj pełnych URL:

```text
https://example.com/page
```

Nie względnych:

```text
/page
```

## 17. Tracking links

System mailingowy może przepisywać linki.

Testuj:

- redirect,
- UTM,
- końcowy URL,
- parametry.

## 18. Preheader

Preheader to tekst widoczny obok tematu w wielu inboxach.

Może być ukryty w treści emaila, ale dostępny dla klienta pocztowego.

## 19. Subject i From

Technicznie to nie HTML, ale wpływają na odbiór.

Sprawdź:

- nazwę nadawcy,
- reply-to,
- temat,
- preheader.

## 20. Accessibility

- alt dla obrazów,
- role presentation dla layout tables,
- odpowiedni kontrast,
- czytelny tekst,
- opisowe linki,
- logiczna kolejność treści.

## 21. Unsubscribe

Mailing komercyjny powinien mieć poprawny mechanizm wypisania zgodny z przepisami i systemem wysyłkowym.

## 22. Spam

Nie istnieje jeden magiczny test.

Wpływ mają m.in.:

- reputacja domeny,
- SPF,
- DKIM,
- DMARC,
- treść,
- zachowanie odbiorców,
- jakość listy.

## 23. Testowanie

Minimum:

- Gmail web,
- Outlook,
- Apple Mail / iOS jeśli dostępne,
- Android,
- dark mode,
- szerokość mobile.

## 24. Narzędzia

Popularne klasy narzędzi:

- preview wielu klientów,
- spam checks,
- link checker,
- HTML inliner.

Nie ufaj tylko jednemu preview.

## 25. Checklist przed wysyłką

- subject,
- preheader,
- from/reply-to,
- wszystkie linki,
- UTM,
- alt,
- obrazy,
- mobile,
- Outlook,
- dark mode,
- unsubscribe,
- wersja tekstowa,
- literówki.

## 26. Co trzeba umieć

- budować layout tabelami,
- stosować inline CSS,
- przygotować responsive email,
- znać ograniczenia Outlooka,
- poprawnie osadzać obrazy,
- testować linki i tracking,
- sprawdzać accessibility.
