
exports.seed = async function (knex) {
  // Deletes ALL existing entries

  // Inserts seed entries
  await knex("users").insert([
    {
      id: 1,
      username: "useone",
      password: "mypassword",
      email: "userone@email.com",
      role: "basic",
    },
    {
      id: 2,
      username: "usertwo",
      password: "mypassword",
      email: "usertwo@email.com",
      role: "admin",
    },
    {
      id: 3,
      username: "userthree",
      password: "mypassword",
      email: "userthree@email.com",
      role: "superadmin",
    },
  ]);
};
