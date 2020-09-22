exports.seed = async function (knex) {
  // Deletes ALL existing entries

  // Inserts seed entries
  await knex("howtos").insert([
    {
      author: "usertwo",
      id: 1,
      post: "post value2",
      title: "rowValue2",
    },
    {
      author: "usertwo",
      id: 2,
      post: "post value2",
      title: "rowValue2",
    },
    {
      author: "usertwo",
      id: 3,
      post: "post value2",
      title: "rowValue2",
    },
  ]);
};
