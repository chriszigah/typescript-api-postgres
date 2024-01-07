/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("auth", (tbl) => {
    // Foreign Key info to 'Lessons' table
    tbl.text("id", 32).primary;
    tbl.text("userid", 32).primary;
    tbl.text("password").notNullable();
    tbl.text("salt").notNullable();
    tbl.text("sessionToken");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("authentication");
};
