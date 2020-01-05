module.exports = {
  up: async queryInterface => {
    const student = await queryInterface.rawSelect(
      'students',
      {
        where: {
          email: 'joaodasilva@gmail.com',
        },
      },
      ['id']
    );

    return queryInterface.bulkInsert('checkins', [
      {
        student_id: student,
        created_at: new Date(2019, 12, 1, 12, 1, 1, 100),
        updated_at: new Date(2019, 12, 1, 12, 1, 1, 100),
      },
      {
        student_id: student,
        created_at: new Date(2019, 12, 2, 12, 1, 1, 100),
        updated_at: new Date(2019, 12, 2, 12, 1, 1, 100),
      },
      {
        student_id: student,
        created_at: new Date(2019, 12, 3, 12, 1, 1, 100),
        updated_at: new Date(2019, 12, 3, 12, 1, 1, 100),
      },
      {
        student_id: student,
        created_at: new Date(2019, 12, 4, 12, 1, 1, 100),
        updated_at: new Date(2019, 12, 4, 12, 1, 1, 100),
      },
      {
        student_id: student,
        created_at: new Date(2019, 12, 5, 12, 1, 1, 100),
        updated_at: new Date(2019, 12, 5, 12, 1, 1, 100),
      },
      {
        student_id: student,
        created_at: new Date(2019, 12, 6, 12, 1, 1, 100),
        updated_at: new Date(2019, 12, 6, 12, 1, 1, 100),
      },
      {
        student_id: student,
        created_at: new Date(2019, 12, 7, 12, 1, 1, 100),
        updated_at: new Date(2019, 12, 7, 12, 1, 1, 100),
      },
      {
        student_id: student,
        created_at: new Date(2019, 12, 8, 12, 1, 1, 100),
        updated_at: new Date(2019, 12, 8, 12, 1, 1, 100),
      },
      {
        student_id: student,
        created_at: new Date(2019, 12, 9, 12, 1, 1, 100),
        updated_at: new Date(2019, 12, 9, 12, 1, 1, 100),
      },
      {
        student_id: student,
        created_at: new Date(2019, 12, 10, 12, 1, 1, 100),
        updated_at: new Date(2019, 12, 10, 12, 1, 1, 100),
      },
      {
        student_id: student,
        created_at: new Date(2019, 12, 11, 12, 1, 1, 100),
        updated_at: new Date(2019, 12, 11, 12, 1, 1, 100),
      },
      {
        student_id: student,
        created_at: new Date(2019, 12, 12, 12, 1, 1, 100),
        updated_at: new Date(2019, 12, 12, 12, 1, 1, 100),
      },
      {
        student_id: student,
        created_at: new Date(2019, 12, 13, 12, 1, 1, 100),
        updated_at: new Date(2019, 12, 13, 12, 1, 1, 100),
      },
      {
        student_id: student,
        created_at: new Date(2019, 12, 14, 12, 1, 1, 100),
        updated_at: new Date(2019, 12, 14, 12, 1, 1, 100),
      },
      {
        student_id: student,
        created_at: new Date(2019, 12, 15, 12, 1, 1, 100),
        updated_at: new Date(2019, 12, 16, 12, 1, 1, 100),
      },
      {
        student_id: student,
        created_at: new Date(2019, 12, 16, 12, 1, 1, 100),
        updated_at: new Date(2019, 12, 16, 12, 1, 1, 100),
      },
      {
        student_id: student,
        created_at: new Date(2019, 12, 17, 12, 1, 1, 100),
        updated_at: new Date(2019, 12, 17, 12, 1, 1, 100),
      },
      {
        student_id: student,
        created_at: new Date(2019, 12, 18, 12, 1, 1, 100),
        updated_at: new Date(2019, 12, 18, 12, 1, 1, 100),
      },
      {
        student_id: student,
        created_at: new Date(2019, 12, 19, 12, 1, 1, 100),
        updated_at: new Date(2019, 12, 19, 12, 1, 1, 100),
      },
      {
        student_id: student,
        created_at: new Date(2019, 12, 20, 12, 1, 1, 100),
        updated_at: new Date(2019, 12, 20, 12, 1, 1, 100),
      },
      {
        student_id: student,
        created_at: new Date(2019, 12, 21, 12, 1, 1, 100),
        updated_at: new Date(2019, 12, 21, 12, 1, 1, 100),
      },
    ]);
  },

  down: queryInterface => queryInterface.bulkDelete('checkins', null, {}),
};
