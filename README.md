# NextJS Starter Temaplte

## Initial Steps

1. [ ] `npm install`
2. [ ] `mv .env.sample .env`
3. [ ] Set postgress Database URL and connection. You can Link Neon DB account
4. [ ] Generate and add `BETTER_AUTH_SECRET` using `openssl rand -base64 32`. You may have to create and add this to your production Environment Variables as well.I will use difference databases and keys for production and development.
5. [ ] Get your API Key for resend, either via vercel or directly from the website. If No key is provided the app will throw and error while starting.
6. [ ] Once all Environment Variables are set, you can host it on vercel. I have linked neonDB and Resend directly via vercel, So the only variables I really had to set were for BETTER_AUTH_SECRET. The email domain is automatically taken from the RESEND_EMAIL_DOMAIN Environment Variable.

## Whats Included

## Appendix

- You use [Neon with Vercel](https://vercel.com/marketplace/neon)
