export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    strapi.db.lifecycles.subscribe({
      models: ['plugin::users-permissions.user'],

      // your lifecycle hooks
      async beforeDelete(event) {
        // @TODO: Make this more robust, with error checking.
        // Should work for initial development.
        strapi
          .service('api::user-dictionary.user-dictionary')
          .deleteWithUserId(strapi, event.params.where.id);
      },
    });
  },
};
