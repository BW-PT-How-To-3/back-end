const cleaner = require("knex-cleaner");

exports.seed = async function (knex) {
  await cleaner.clean(knex, {
    mode: "truncate",
    ignoreTables: ["knex_migrations", "knex_mirgrations_lock"],
  });
};
