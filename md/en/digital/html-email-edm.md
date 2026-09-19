# HTML Email / EDM — Practical Handbook

## 1. Why HTML email is different

Email clients do not behave like modern browsers.

They may:

- strip CSS,
- rewrite HTML,
- block remote images,
- ignore modern layout systems,
- use proprietary rendering engines.

Code for compatibility, not elegance.

## 2. Table-based layout

For reliable email layout, tables are still common.

Example:

```html
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
  <tr>
    <td align="center">
      ...
    </td>
  </tr>
</table>
```

## 3. Width

A common desktop email width is around:

```text
600–700 px
```

Use fluid width for smaller screens.

## 4. Inline CSS

Many email styles should be inline:

```html
<td style="font-family:Arial,sans-serif;font-size:16px;line-height:24px;">
  Text
</td>
```

Do not assume external stylesheets will work.

## 5. Reset

Email templates often include a small reset for margins, image behavior and table spacing.

Keep resets conservative.

## 6. role="presentation"

Use:

```html
<table role="presentation">
```

for layout-only tables so assistive technologies do not interpret them as data tables.

## 7. Images

Always define dimensions where practical.

Example:

```html
<img
  src="https://example.com/image.png"
  width="600"
  alt="Product"
  style="display:block;width:100%;max-width:600px;height:auto;border:0;"
>
```

## 8. Image formats

Safe/common formats:

- JPEG,
- PNG,
- GIF.

WEBP support varies across email clients, especially older desktop Outlook environments.

If transparency and broad compatibility are required, PNG is a safe choice.

## 9. Outlook

Classic desktop Outlook versions may use Microsoft Word's HTML rendering engine.

Common limitations include:

- poor modern CSS support,
- odd spacing,
- inconsistent background images,
- problematic list rendering,
- unsupported layout properties.

Test Outlook explicitly.

## 10. Buttons

Simple button:

```html
<a href="https://example.com"
   style="display:inline-block;padding:14px 24px;background:#000;color:#fff;text-decoration:none;">
  Learn more
</a>
```

## 11. Bulletproof buttons

For broad Outlook compatibility, some templates use VML fallbacks.

Use tested snippets instead of inventing new VML from scratch for every campaign.

## 12. Media queries

Media queries can improve mobile layout.

Example:

```css
@media only screen and (max-width:600px) {
  .stack {
    display:block !important;
    width:100% !important;
  }
}
```

Support varies.

## 13. Responsive email

Typical approach:

- fluid outer table,
- max-width container,
- stack columns on small screens,
- large tappable buttons,
- readable text without zoom.

## 14. Dark mode

Some clients automatically modify colors.

Test:

- background colors,
- logos,
- transparent images,
- contrast,
- text colors.

Do not assume exact dark-mode rendering.

## 15. Background images

Background images are less reliable than normal `img` elements.

For Outlook, VML may be required.

## 16. Links

Use absolute HTTPS URLs.

Example:

```html
<a href="https://example.com/product">
```

Avoid relative paths.

## 17. Tracking links

Campaign systems often rewrite links for click tracking.

Test the final sent message, not only your local HTML file.

## 18. Preheader

A preheader is preview text shown next to or below the subject line in many clients.

Keep it useful and concise.

## 19. Subject and From

The subject should communicate value clearly.

The From name should be recognizable.

Avoid misleading subject lines.

## 20. Accessibility

Use:

- meaningful alt text,
- sufficient contrast,
- readable font size,
- semantic headings where supported,
- presentation roles for layout tables,
- descriptive links.

Avoid link text such as:

```text
click here
```

when a descriptive alternative is possible.

## 21. Unsubscribe

Marketing email should provide the required unsubscribe mechanism according to applicable law and platform policy.

Do not hide it.

## 22. Spam

Spam filtering may consider:

- domain reputation,
- authentication,
- complaint rate,
- content,
- URL reputation,
- sending pattern.

HTML quality alone does not determine deliverability.

## 23. Testing

Test at minimum:

- Gmail web,
- Gmail mobile,
- Outlook desktop,
- Outlook web,
- iOS Mail / Apple Mail where relevant.

Check both light and dark mode.

## 24. Tools

Useful tools include:

- Litmus,
- Email on Acid,
- campaign-platform previews,
- real device/client testing.

## 25. Pre-send checklist

- links correct,
- tracking correct,
- images load,
- PNG/JPEG/GIF compatibility checked,
- alt text present,
- Outlook tested,
- mobile layout tested,
- dark mode checked,
- unsubscribe present,
- subject/preheader correct,
- final production URLs used.

## 26. What you should know

You should understand:

- table-based layout,
- inline CSS,
- Outlook limitations,
- image compatibility,
- bulletproof buttons,
- responsive techniques,
- dark mode,
- tracking links,
- accessibility,
- deliverability basics,
- multi-client testing.

The key rule: an HTML email is successful only when it renders reliably in real email clients, not when it looks perfect in a browser.
