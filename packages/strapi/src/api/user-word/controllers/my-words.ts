/**
 * A set of functions called "actions" for `my-words`
 */

export default {
  exampleAction: async (ctx, next) => {
    /**
     * Todos:
     * Check user info; reject if not called by the user (how do I test this?).
     * Return just a pure list of the user-word objects; don't need create/updated (or probably the id).
     * Name it something useful (not sure `myWords` is what I want here).
     */
    ctx.query = { ...ctx.query, local: 'en' }
    const { email, id: userId } = ctx.state.user
    strapi.log.info({ "message": `Find[all] with user: ${email}` })

    const data = await strapi.entityService.findMany("api::user-word.user-word", {
      filters: { owner: userId },
      populate: { word: true },
      fields: ["status"]
    })

    const myWords = data.map((word) => { return { status: word.status, word: word.word.word, id: word.word.id } })

    return { myWords }
  }
};
