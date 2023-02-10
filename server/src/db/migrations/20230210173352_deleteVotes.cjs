/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.alterTable("votes", (table) => {
      table.dropForeign("reviewId");
      table.foreign("reviewId").references("reviews.id").onDelete("CASCADE");
      table.dropForeign("userId");
      table.foreign("userId").references("users.id").onDelete("CASCADE")
    });
}
  
/**
* @param {Knex} knex
*/
exports.down = (knex) => {  
    return knex.schema.alterTable("votes", (table) => {
      table.dropForeign("reviewId");
      table.foreign("reviewId").references("reviews.id").onDelete("NO ACTION");
      table.dropForeign("userId");
      table.foreign("userId").references("users.id").onDelete("NO ACTION")
    })
 }