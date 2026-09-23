# Integrate Better Auth with NextJS

- [NextJS Integration](https://better-auth.com/docs/integrations/next)

## Mount Handler at `app/api/auth/[...all]/route.ts`

```ts
import { auth } from "@/lib/auth"; // path to your auth file
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);
```

## Client Instance at `lib/auth-client.ts`

```ts
import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react

export const authClient = createAuthClient({});
```

## NextJS Middleware

- NextJS uses `proxy.ts`. [Get Started here](https://nextjs.org/docs/app/getting-started/proxy) or a more [detailed reference here](https://nextjs.org/docs/app/api-reference/file-conventions/proxy)
- We will keep things simple. Our frontend login route will be `/login` while our protected route will be `/dashboard`. Feel free to change these later.

```ts
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    const signInUrl = new URL("/login", request.url);
    signInUrl.searchParams.set("callbackURL", request.nextUrl.pathname);

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"], // Specify the routes the middleware applies to
};
```
