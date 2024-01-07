/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("profiles", (tbl) => {
    tbl.text("id", 32).index().primary;
    tbl.text("userid", 25).notNullable();
    tbl.text("username", 25);
    tbl.text("firstname", 25);
    tbl.text("lastname", 25);
    tbl.text("dob");
    tbl.text("gender");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
