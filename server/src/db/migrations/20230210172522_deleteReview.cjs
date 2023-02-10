/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.alterTable("reviews", (table) => {
      table.dropForeign("memeId");
      table.foreign("memeId").references("memes.id").onDelete("CASCADE");
    });
  };
  
  /**
   * @param {Knex} knex
   */
  exports.down = (knex) => {
    return knex.schema.alterTable("reviews", (table) => {
      table.dropForeign("memeId");
      table.foreign("memeId").references("memes.id").onDelete("NO ACTION");
    });
  };