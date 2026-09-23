# Scaffolding a NextJS Project

- [ ] [Install NextJS](https://nextjs.org/docs/app/getting-started/installation)
- [ ] [Install ShadCn](https://ui.shadcn.com/create) with [Dark Mode](https://ui.shadcn.com/docs/dark-mode/next)
- [ ] Layout, [Styles with typeset](https://ui.shadcn.com/docs/typeset), [Routing Files](https://nextjs.org/docs/app/api-reference/file-conventions)

## Directory Structure

- We will try to keep the defaults for NextJS and Shadcn
- Globally used components will go in a serparate folder. `components/client` and `components/server` for client and server components respectively. The folder structure inside those should reflect where the components appear. For example a component to be used in the `/login` route should be in `components/client/login`.

## TODO STILL

- Linting for server,client and actions
- CSS Styles
- Headers and Footers
- Layout.tsx modification
- Routing files

## Not allow relative imports linting rule

```json
{
  "plugins": ["no-relative-import-paths"],
  "rules": {
    "no-relative-import-paths/no-relative-import-paths": [
      "error",
      { "allowSameFolder": false, "rootDir": ".", "prefix": "@" }
    ]
  }
}
```
