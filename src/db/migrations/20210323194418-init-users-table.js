'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      username: Sequelize.STRING,
      password: Sequelize.STRING,
    }),

  down: async (queryInterface) => queryInterface.dropTable('Users'),
};
