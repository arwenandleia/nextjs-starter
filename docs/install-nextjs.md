# Install NextJS

- Read [Installation Docs](https://nextjs.org/docs/app/getting-started/installation)
- Create a project director using `mkdir <projectname>`

## Summary

### Install libraries and modify boilerplate code

```bash
npx create-next-app@latest .
rm public/*.svg
mkdir -p docs
```

### Replace `app/page.tsx` with a simple component

```tsx
export default async function RootHomePage() {
  return (
    <article>
      <h1>Home Page</h1>
      <p> Simple template</p>
    </article>
  );
}
```
