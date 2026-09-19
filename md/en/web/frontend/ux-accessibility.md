# UX and Accessibility for Developers — Handbook

## 1. UX for developers

UX is not only appearance.

A good solution is understandable, predictable, provides feedback, helps users recover from errors and does not require guessing.

## 2. Hierarchy

Users should immediately understand where they are, what they can do and what matters most.

## 3. Forms

Every field should have a label:

```html
<label for="email">Email</label>
<input id="email" name="email" type="email">
```

A placeholder does not replace a label.

## 4. Errors

Weak:

```text
Error 422
```

Better:

```text
The email address has an invalid format.
```

Even better: identify the exact field, preserve valid input and explain how to fix the problem.

## 5. Loading state

If an operation takes time, show progress, prevent accidental double submission and confirm completion.

## 6. Empty state

Instead of an empty table:

```text
You do not have any projects yet.
Create your first project.
```

## 7. Keyboard navigation

The application should be usable without a mouse.

Test Tab, Shift+Tab, Enter, Space and Escape.

## 8. Focus

Do not remove focus outlines without providing a replacement.

```css
:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
}
```

## 9. Semantic HTML

Prefer header, nav, main, section, article, button, form, label and footer instead of building everything from div elements.

## 10. Button vs link

A link navigates. A button performs an action.

Do not use a clickable div when you need a button.

## 11. Alt text

Informative image:

```html
<img src="chart.png" alt="Sales increased by 18% year over year">
```

Decorative image:

```html
<img src="decoration.svg" alt="">
```

## 12. Contrast

Text must be readable. Use contrast checking tools instead of judging only by eye.

## 13. Colour

Do not communicate information with colour alone. Combine colour with an icon and/or text.

## 14. Responsive design

Design for phones, tablets and desktops. Do not only scale everything proportionally.

## 15. Touch targets

Touch controls should be large enough and sufficiently separated.

## 16. Motion

Animation should help rather than distract.

Respect reduced-motion preferences:

```css
@media (prefers-reduced-motion: reduce) {
    /* reduce animations */
}
```

## 17. ARIA

Rule of thumb:

```text
semantic HTML first, ARIA second
```

Do not add ARIA when the native element already has the correct semantics.

## 18. aria-label

For an icon-only button:

```html
<button aria-label="Close">
    ×
</button>
```

## 19. Screen readers

Check heading order, button names, form labels and error announcements.

## 20. WCAG — practical view

A developer does not need to memorise the entire standard. Focus on semantics, keyboard access, focus, contrast, labels, alt text, error messages and responsive behaviour.

## 21. UX of a process

A good process:

1. the user knows what to do,
2. the system shows progress,
3. success is confirmed,
4. errors can be corrected.

## 22. Confirming destructive actions

When deleting important data, use a clear message, name the affected object and make the destructive action explicit.

Do not ask for confirmation for every trivial action.

## 23. Progressive disclosure

Do not show thirty options at once. Keep common actions visible and advanced options deeper in the interface.

## 24. Developer checklist

- semantic HTML,
- keyboard support,
- visible focus,
- form labels,
- understandable errors,
- loading state,
- empty state,
- responsive layout,
- correct button/link semantics,
- meaningful alt text,
- no colour-only information.

## 25. What you should know

You should be able to review a form, identify accessibility issues, create semantic HTML, design loading/error/empty states and understand the practical basics of WCAG.
