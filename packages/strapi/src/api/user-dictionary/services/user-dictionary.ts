/**
 * user-dictionary service
 */

import { factories } from "@strapi/strapi"

export default factories.createCoreService(
  "api::user-dictionary.user-dictionary",
  {
    async deleteWithUserId(strapi, userId) {
      await strapi.db.query("api::user-dictionary.user-dictionary").delete({
        where: { user: { id: userId } },
      })
    },
  }
)
