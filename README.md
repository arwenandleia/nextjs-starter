# NextJS Starter Temaplte

## Initial Steps

- [ ] Clone the repo and/or use it as a template.
- [ ] `npm install`
- [ ] `mv .env.sample .env`
- [ ] Set postgress Database URL and connection. You can Link Neon DB account
- [ ] Generate and add `BETTER_AUTH_SECRET` using `openssl rand -base64 32`. You may have to create and add this to your production Environment Variables as well.I will use difference databases and keys for production and development.
- [ ] Get your API Key for resend, either via vercel or directly from the website. If No key is provided the app will throw and error while starting. You can add this for your dev server on your local machine as well.
- [ ] Once all Environment Variables are set, you can host it on vercel. I have linked neonDB and Resend directly via vercel, So the only variables I really had to set were for BETTER_AUTH_SECRET. The email domain is automatically taken from the RESEND_EMAIL_DOMAIN Environment Variable.
- [ ] `npm run db:dev` or `npm run db:prod` for Database migrations once the DB URL has been set. This will be needed for authentication. Dev or Prod depends on what your DATABASE_URL is pointing to.
- [ ] Update metadata in `app/layout.tsx`. Also update the favicon. Either using `favicon.ico` or `icon.png`

## Whats Included

## Appendix

- You use [Neon with Vercel](https://vercel.com/marketplace/neon)
