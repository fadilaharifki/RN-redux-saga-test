'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    const masterActivity = await queryInterface.describeTable('master_activities');

    if (!masterActivity.is_patient_id)
      await queryInterface.addColumn('master_activities', 'is_patient_id', {
        allowNull: true,
        type: Sequelize.TINYINT,
        defaultValue : 0
      })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('master_activities', 'is_patient_id')
  }
};
