# Styling using Typeset

```bash
touch app/typeset.css
```

- We will use Shadcn typeset to create a standardized layout across the app.
- Copy the `typeset.css` file from [Build your typeset](https://ui.shadcn.com/typeset). Feel free to modify as per the [Typeset Docs](https://ui.shadcn.com/docs/typeset).
- There is a provision to add a [custom typeset](https://ui.shadcn.com/docs/typeset#custom-typesets) if needed, but we will just go with the defaults here
- We need to modify `app/layout.tsx`, which will do later

## Modify `app/globals.css`

- [ ] **ENSURE THAT YOU IMPORT TYPESET OR ELSE YOU WILL NOT GET STYLES FROM TYPESET**
- [ ] You can add some helper classes that are used by me later if you like. I have added them right at the bottom of my css file.

```css
@import "tailwindcss"; /* This should already be there. add the typeset import after this line */
@import "./typeset.css";
/*....rest of you css....*/
/* some helper classes */
@utility no-scrollbar {
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;

  @apply scrollbar-none;
  @apply overflow-y-auto;
}

@utility max-w-container {
  @apply container mx-auto;
}
```
