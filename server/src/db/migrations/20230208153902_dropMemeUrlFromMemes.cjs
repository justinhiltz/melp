/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.table("memes", (table) => {
        table.dropColumn("memeUrl")
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.table("memes", (table) => {
        table.string("memeUrl").notNullable()
    })
}
