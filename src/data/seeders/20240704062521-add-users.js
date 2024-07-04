'use strict';
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Adam Doe',
          email: 'Adam@islam.com',
          userId: uuidv4(),
          createdAt: moment().toISOString(),
          updatedAt: moment().toISOString(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', { email: 'Adam@islam.com' }, {});
  },
};
