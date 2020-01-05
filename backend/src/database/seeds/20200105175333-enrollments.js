module.exports = {
  up: async queryInterface => {
    const start = await queryInterface.rawSelect(
      'plans',
      {
        where: {
          title: 'Start',
        },
      },
      ['id']
    );

    const gold = await queryInterface.rawSelect(
      'plans',
      {
        where: {
          title: 'Gold',
        },
      },
      ['id']
    );

    const diamond = await queryInterface.rawSelect(
      'plans',
      {
        where: {
          title: 'Diamond',
        },
      },
      ['id']
    );

    return queryInterface.bulkInsert('enrollments', [
      {
        student_id: 3,
        plan_id: start,
        price: 129.0,
        start_date: new Date(2019, 5, 16),
        end_date: new Date(2019, 6, 16),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        student_id: 2,
        plan_id: gold,
        price: 327.0,
        start_date: new Date(2019, 5, 16),
        end_date: new Date(2019, 8, 16),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        student_id: 1,
        plan_id: diamond,
        price: 534.0,
        start_date: new Date(2020, 1, 1),
        end_date: new Date(2020, 7, 1),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: queryInterface => queryInterface.bulkDelete('enrollments', null, {}),
};
