module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('students', [
      {
        name: 'João da silva',
        email: 'joaodasilva@gmail.com',
        date_of_birth: new Date(2000, 11, 22),
        weight: 90.5,
        height: 1.82,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Feunsius',
        email: 'feunsius@gmail.com',
        date_of_birth: new Date(1980, 11, 22),
        weight: 80.5,
        height: 1.62,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Likexa',
        email: 'likexa@gmail.com',
        date_of_birth: new Date(1988, 5, 12),
        weight: 80.5,
        height: 1.62,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Lucea',
        email: 'lucea@gmail.com',
        date_of_birth: new Date(1986, 5, 12),
        weight: 120.5,
        height: 1.72,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Yamblump',
        email: 'yamblump@gmail.com',
        date_of_birth: new Date(1986, 5, 12),
        weight: 100.1,
        height: 1.5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Tiorti',
        email: 'tiorti@gmail.com',
        date_of_birth: new Date(2002, 5, 12),
        weight: 99.1,
        height: 1.78,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: queryInterface => queryInterface.bulkDelete('students', null, {}),
};
