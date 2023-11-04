# Getting Started

This monorepo is broken up into two main packages:

- `strapi` which is the CMS based on Strapi
- `client` which is the browser based on NextJS/React

To get it up and running do the following:

- Update various `.env` files:
  - `strapi` requires a lone `.env`. See the `.env.example` file to get going. You will need to start up a `postgresql` service and create a database (currently) called "commonplacebook-strapi" if you haven't already.
  - `client` can optionally take a `.env.local` (or other variant) but by default has a mandatory `.env` file that is required by NextJS (and committed to the repository on purpose).
- `yarn` to install all packages.
- Run the development process:
  - `yarn workspace @commonplacebook/strapi develop` 
  - `yarn workspace @commonplacebook/client dev` 
  - @todo: clean this up so that they are consistent.
  - @todo: shorten commonplacebook to ease typing (though `yarn` has a way around this).

# Project Documentation

See individual package README.md files for further details.
- Strapi [README.md](packages/strapi/README.md) 
- Client [README.md](packages/client/README.md)

Request access to the working doc, [here](https://docs.google.com/document/d/1AANzS1kVUwoKQ5fi-yNOKj-pWklagKmmTdHtlQhSBz4/edit?usp=sharing) if you're a contributor to the project.
 