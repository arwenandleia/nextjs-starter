# Install NextJS

- Read [Installation Docs](https://nextjs.org/docs/app/getting-started/installation)
- Create a project director using `mkdir <projectname>`
- Remeber to set the metadata in the `app.layout.tsx` file

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

### Additional Helper Libraries

```bash
npm install server-only zod resend react-hook-form @hookform/resolvers
```

### Directory Structure

```bash
mkdir -p components/client
mkdir -p components/server
mkdir -p lib/db/schemas
mkdir -p lib/actions
```
