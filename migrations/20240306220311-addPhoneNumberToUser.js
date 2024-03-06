"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "phoneNumber", {
      type: Sequelize.STRING,
      allowNull: true, // Change to false if phone number is required
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "phoneNumber");
  },
};
