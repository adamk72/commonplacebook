# Getting Started

This monorepo is broken up into two main packages (using [yarn workspaces](https://yarnpkg.com/features/workspaces)):

- `client` which is the browser based on NextJS/React
- `strapi` which is the CMS based on Strapi

To get it up and running do the following (some you only have to do once). Make sure you have `yarn`, `corepack` (part of Node 16+), and `nvm` installed.

- Run `corepack enable` to update Yarn to 4.0.1 per the root package.json file.
- `nvm use` to select the proper Node version (18 for this project).
- -or- `nvm alias default 18` to force the default be 18.
- Update various `.env` files:
  - `client` can optionally take a `.env.local` (or other variant) but by default has a mandatory `.env` file that is required by NextJS (and committed to the repository on purpose; see [here](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)).
  - `strapi` requires a lone `.env`. See the [.env.example](packages/strapi/.env.example) file to get going. See below for details on setting up the database.
- `yarn` to install all packages.
- Run the development process:
  - `yarn client:dev` will fire up NextJS (usually on port 3000).
  - `yarn strapi:dev` will fire up Strapi (usually on port 1337).
    - Login with `admin@email.com` and `Admin1234`.
  - -or- `yarn dev` to run both in one terminal.
- Other commands of interest:
  - `yarn format` to format everything (via prettier).
  - `yarn lint` to lint all files (via eslint).
  - `yarn lint:fix` like lint, but fix the files too.

## Setting up the local DB

Strapi is running on Postgres. You can check if you have it on your system by running `psql`. If it doesn't come up, install it. This (article)[https://www.sqlshack.com/setting-up-a-postgresql-database-on-mac/] is a good way to get started on Mac, but here's the short version:

On a Mac use:

- `brew install postgresql` (for the command line client).
- `brew services start postgresql`
- `psql postgres`

For our Strapi instance, it expects the following:

```
DATABASE_NAME=commonplacebook-strapi
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
```

So you need to create all of these:

- `CREATE ROLE postgres WITH LOGIN PASSWORD 'postgres';`
- `ALTER ROLE postgres CREATEDB;`
- `CREATE DATABASE commonplacebook_strapi;`

If you get an error about "permission denied for schema public", then additionally run the following (required for Postgres v15+, but were running 14 be default, so this is just in case):

- `GRANT ALL ON DATABASE commonplacebook_strapi TO postgres;`
- `ALTER DATABASE commonplacebook_strapi OWNER TO postgres;`

## Other Notes

Obviously, for full interaction, you need both applications running. At the time of this writing, everything is local (in particular the database).

For installs, if you want to target the client or Strapi specifically, you need to prepend "-W @commonplace/\*" to the command line. For example: `yarn workspace @commonplacebook/client add jest`

# Project Documentation

See individual package README.md files for further details.

- Strapi [README.md](packages/strapi/README.md)
- Client [README.md](packages/client/README.md)

Request access to the working doc, [here](https://docs.google.com/document/d/1AANzS1kVUwoKQ5fi-yNOKj-pWklagKmmTdHtlQhSBz4/edit?usp=sharing) if you're a contributor to the project.
