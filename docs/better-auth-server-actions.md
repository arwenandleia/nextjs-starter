# Better Auth Server Actions

- We will use `lib/actions/login.actions.ts` to handle the backend for most actions like signing up, login, resetting password, etc..
- We will be using the server part of the [documentation](https://better-auth.com/docs/authentication/email-password)
- Remember to pass along the [headers](https://better-auth.com/docs/concepts/api#body-headers-query)

## Standard Response Type

- We will ensure a simple response type from all login actions.

```ts
export type LoginActionResonseType = {
  success: boolean;
  message: string;
};
```
