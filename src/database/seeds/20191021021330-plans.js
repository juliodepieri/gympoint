module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('plans', [
      {
        tittle: 'Start',
        duration: 1,
        price: 129.0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        tittle: 'Gold',
        duration: 3,
        price: 109.0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        tittle: 'Diamond',
        duration: 6,
        price: 89.0,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: () => {},
};
