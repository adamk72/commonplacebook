# Getting Started

This monorepo is broken up into two main packages (using [yarn workspaces](https://yarnpkg.com/features/workspaces)):

- `client` which is the browser based on NextJS/React
- `strapi` which is the CMS based on Strapi

To get it up and running do the following:

- Update various `.env` files:
  - `client` can optionally take a `.env.local` (or other variant) but by default has a mandatory `.env` file that is required by NextJS (and committed to the repository on purpose; see [here](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)).
  - `strapi` requires a lone `.env`. See the [.env.example](packages/strapi/.env.example) file to get going. You will need to start up a `postgresql` service and create a database (currently) called "commonplacebook-strapi" if you haven't already.
- `yarn` to install all packages.
- Run the development process:
  - `yarn client:dev` will fire up NextJS (usually on port 3000)
  - `yarn strapi:dev` will fire up Strapi (usually on port 1337)
- Other commands of interest:
  - `yarn format` to format everything (via prettier).
  - `yarn lint` to lint all files (via eslint).
  - `yarn lint:fix` like lint, but fix the files too.

## Notes

Obviously, for full interaction, you need both applications running. At the time of this writing, everything is local (in particular the database).

For installs, if you want to target the client or Strapi specifically, you need to prepend "-W @commonplace/*" to the command line. For example: `yarn workspace @commonplacebook/client add jest`

# Project Documentation

See individual package README.md files for further details.

- Strapi [README.md](packages/strapi/README.md)
- Client [README.md](packages/client/README.md)

Request access to the working doc, [here](https://docs.google.com/document/d/1AANzS1kVUwoKQ5fi-yNOKj-pWklagKmmTdHtlQhSBz4/edit?usp=sharing) if you're a contributor to the project.
