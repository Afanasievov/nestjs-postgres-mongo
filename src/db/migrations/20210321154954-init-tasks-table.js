'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('Tasks', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      title: Sequelize.STRING,
      description: Sequelize.STRING,
      status: {
        type: Sequelize.ENUM,
        values: ['OPEN', 'IN_PROGRESS', 'DONE'],
        defaultValue: 'OPEN',
        notNull: true,
      },
    }),

  down: async (queryInterface) => queryInterface.dropTable('Tasks'),
};
