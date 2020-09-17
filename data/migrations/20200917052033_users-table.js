exports.up = function (knex, Promise) {
    return knex.schema
      .createTable("roles", tbl => {
        tbl.increments("id")
        tbl.string("name", 128)
            .notNullable()
            .unique()
      })
      .createTable("users", tbl => {
        tbl.increments("id")
        tbl.string("username", 128)
            .notNullable()
            .unique()
            .index()
        tbl.string("password", 256)
            .notNullable()
        tbl.string("email")
            .notNullable()
        tbl.integer("role")
            .unsigned()
            .references("id")
            .inTable("roles")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE")
      })
      .createTable("hacks", tbl => {
        tbl.increments("id")
        tbl.string("title")
          .notNullable()
        tbl.string("post")
          .notNullable()
        tbl.timestamp("created_at", { useTz: true })
          .defaultTo(knex.fn.now())
        tbl.integer("user_id")
          .notNullable()
          .unsigned()
          .references("id")
          .inTable("users")
          .onUpdate("CASCADE")
          .onDelete("SET NULL");
      })
  };
  
  exports.down = function (knex, Promise) {
    return knex.schema
        .dropTableIfExists("hacks")
        .dropTableIfExists("users")
        .dropTableIfExists("roles")
  };
