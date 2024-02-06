Notes that, hopefully, will keep me organized on how Strapi works, starting with [Strapi Docs Website](https://docs.strapi.io/dev-docs/intro). The goal is to use Strapi as idiomatically as possible and also learn more about database interactions.

# Discoveries During Development

## Gotchas
- You may find documentation to be out of date, especially in some of the blog posts. For example, [this](https://strapi.io/blog/strapi-internals-customizing-the-backend-part-1-models-controllers-and-routes) post refers to `ctx.request.params` which should actually be just `ctx.params`. 
- When adding a "user" as a relation to an content type, note that there are two types: `users-permissions` and `admin`. Make sure you pick the correct one. 


# Strapi in General

Strapi backend is based on Koa. An intro is [here](https://koajs.com/#introduction). See "[Context](https://koajs.com/#context)" section in particular.

## Useful (hopefully) links
- [Strapi Internals Example](https://strapi.io/blog/strapi-internals-customizing-the-backend-part-1-models-controllers-and-routes)
- [Strapi Filtering Blog Post](https://strapi.io/blog/demystifying-strapi-s-populate-and-filtering)

## Request path:

1. Strapi receives request.
2. Go through global middleware.
3. Hit a route.
4. Apply read-only route policies; apply route middleware.
5. Execute Controllers; use Services as needed (helpers for Controllers).
5. Model data interaction via Entity Service and/or Query Engine.
7. Return response. Can go back through both types of middleware before sending. Middleware that returns before `await next()` will cause an immediate send. 

## Requests and responses

`ctx` object is passed to every element. Contains:

- `ctx.request` &mdash; includes `.body`, `.query`, and `.headers`.
- `ctx.state` &mdash; about `.user` and `.auth` concepts.
- `ctx.response` &mdash; has a `.body` and other common items.

## Routes

There are `core` and `custom` routers.

Core includes `find`, `findOne`, `create`, `update`, and `delete`. Use `createCoreRouter` to both configure and disable route (in prep for creating customer ones).

Polices and middleware are in separate folders but referred to by name when configuring.

### Policies

Policies are pre-controller actions and can be global.

- use global::policy-name for global policies
- use api::api-name.policy-name for API policies
- use plugin::plugin-name.policy-name for plugin policies

### Middleware

[Middleware docs](https://docs.strapi.io/dev-docs/backend-customization/middlewares)

- use global::middleware-name for application-level middlewares
- use api::api-name.middleware-name for API-level middlewares
- use plugin::plugin-name.middleware-name for plugin middlewares

### Controllers and services

#### Controllers

For new controllers, can use CLI `strapi generate` or manually create the file (sync or async is possible).

> Don't forget to sanitize/validate requests.
> Conditions apply when querying a model not inside the current controller.
> See [here](https://docs.strapi.io/dev-docs/backend-customization/controllers#sanitization-and-validation-in-controllers) for more in general.

Use `yarn strapi controllers:list` to see list of controllers (need to run inside /packages/strapi). Shows list of controller names.

### Services

As with controllers, use CLI `strapi generate`.

Same general concept applies as with controllers, except controllers call services.




