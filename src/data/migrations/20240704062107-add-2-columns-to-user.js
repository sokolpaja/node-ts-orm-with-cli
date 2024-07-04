'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'me@example.com',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'email');
  },
};
