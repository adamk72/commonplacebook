/**
 * user-word controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::user-word.user-word',   {
  async find(ctx) {
    ctx.query = { ...ctx.query, local: 'en' }
    const {email} = ctx.state.user
    strapi.log.info({"message": `Find[all] with user: ${email}`}) 
    const { data, meta } = await super.find(ctx);

 
    return {data} 
  },
  async findOne(ctx) {
    ctx.query = { ...ctx.query, local: 'en' }
    const {id} = ctx.params;
    strapi.log.info({"message":`findOne: ${id}`})

    const ud = await strapi.entityService.findOne("api::user-word.user-word", id);

    return { ud };
  }
});
