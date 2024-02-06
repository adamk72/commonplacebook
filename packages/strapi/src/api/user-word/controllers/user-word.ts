/**
 * user-word controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::user-word.user-word', {
  async find(ctx) {
    ctx.query = { ...ctx.query, local: 'en' }
    const { email, id: userId } = ctx.state.user
    strapi.log.info({ "message": `Find[all] with user: ${email}` })

    const ud = await strapi.entityService.findMany("api::user-word.user-word", {
      filters: { owner: userId },
      populate: { word: true }
    })

    return { ud }
  },
  async findOne(ctx) {
    ctx.query = { ...ctx.query, local: 'en' }
    const { id } = ctx.params;
    strapi.log.info({ "message": `findOne: ${id}` })

    const ud = await strapi.entityService.findOne("api::user-word.user-word", id);

    return { ud };
  }
});
