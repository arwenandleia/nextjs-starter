# Scaffolding a NextJS Project

- [ ] [Install NextJS](https://nextjs.org/docs/app/getting-started/installation)
- [ ] [Install ShadCn](https://ui.shadcn.com/create) with [Dark Mode](https://ui.shadcn.com/docs/dark-mode/next)
- [ ] [Styles with typeset](https://ui.shadcn.com/docs/typeset)
- [ ] [Routing Files](https://nextjs.org/docs/app/api-reference/file-conventions)
- [ ] Headers and Footers
- [ ] App wide layout
- [ ] [Drizzle ORM](https://orm.drizzle.team/docs/get-started/postgresql-new)
- [ ] [Better Auth](https://better-auth.com/docs/installation) with [Drizzle](https://better-auth.com/docs/adapters/drizzle)
- [ ] Add [NextJS Integration](https://better-auth.com/docs/integrations/next)
- [ ] Authentication with [Email and Password](https://better-auth.com/docs/authentication/email-password)

## Directory Structure

- We will try to keep the defaults for NextJS and Shadcn
- Globally used components will go in a serparate folder. `components/client` and `components/server` for client and server components respectively. The folder structure inside those should reflect where the components appear. For example a component to be used in the `/login` route should be in `components/client/login`.

## TODO STILL

- Linting for server,client and actions
- MDX components
- Setup Postgres locally

### Better Auth

- Configure Better Auth
- Dynamic URLS
- Resend
- SignUp Form
- Login Form
- Verification Email form
- Reset Passsword Form
- Change Password Form

## Yet to implement

- Error Monitoring : Sentry
- AI SDF - AI SDK from Vercel
- Payments: Polar
- Analytics: Vercel inbuild

## Additional Docs on

- Setup Postgres locally
- Display current docs using mdx
