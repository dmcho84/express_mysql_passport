"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      // {
      //   email: "dmcho84@gmail.con",
      //   name: "동민조",
      //   password: "1234",
      //   createdAt: "2019-04-16",
      //   updatedAt: "2019-04-16"
      // },
      {
        email: "dmcho84@gmail.con",
        name: "구글 동민",
        googleId: "123456789",
        createdAt: "2019-04-18",
        updatedAt: "2019-04-18"
      },
      {
        email: "dmcho@qualson.con",
        name: "퀄슨 동민",
        password: "qwer",
        createdAt: "2019-04-17",
        updatedAt: "2019-04-17"
      }
    ]);
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete("Users", null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
