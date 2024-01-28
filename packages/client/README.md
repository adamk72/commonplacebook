# Notes

## Middleware

Using middleware for authentication. Currently, the app will redirect non-logged in users (i.e., users who don't have a JWT cookie) back to the home page

## TODOs

- automate `prettier` and `lint:fix` on commit
- pull `SignUpIn` out into it's own library, since it's such a common pattern
- Use refresh token system instead of directly storing the JWT in a cookie.

# Using `qs` for HTTP requests

See the starter doc [here](../strapi/using_qs.md)

# ORIGINAL README

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
```
