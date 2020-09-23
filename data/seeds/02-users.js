exports.seed = async function (knex) {
  // Deletes ALL existing entries

  // Inserts seed entries
  await knex("users").insert([
    {
      id: "ba746c97-7150-4f21-840d-3e9daa598292",
      username: "useone",
      password: "mypassword",
      email: "userone@email.com",
      role: "basic",
    },
    {
      id: "afb615ba-6449-41ba-9c42-2fc24714551a",
      username: "usertwo",
      password: "mypassword",
      email: "usertwo@email.com",
      role: "admin",
    },
    {
      id: "299f49e6-b8b9-4d49-92f1-80cc703366a1",
      username: "userthree",
      password: "mypassword",
      email: "userthree@email.com",
      role: "superadmin",
    },
  ]);
};
