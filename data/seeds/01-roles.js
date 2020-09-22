
exports.seed = async function (knex) {
  // Deletes ALL existing entries

  // Inserts seed entries
  await knex("roles").insert([
    { id: 1, name: "basic" },
    { id: 2, name: "admin" },
    { id: 3, name: "superadmin" },
  ]);
};

