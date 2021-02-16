'use strict';
const { hashPass } = require('../helper/bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = hashPass('1234')
    await queryInterface.bulkInsert('Users', [{
      email: 'customer@mail.com',
      password: password,
      role: 'customer',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
