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

    return queryInterface.bulkInsert('help_orders', [
      {
        student_id: student,
        question: 'Com que ritmo é preciso treinar para ter resultados?',
        answer:
          'É a freqüência de suas sessões que vai torná-lo treinado (a), quer dizer, seja regular. É melhor treinar 2 - 3 vezes por semana, do que de vez em quando. É a prática regular que lhe trará prazer e resultados.',
        answer_at: new Date(2020, 6, 15, 12, 1, 1, 100),
        created_at: new Date(2020, 6, 12, 12, 1, 1, 100),
        updated_at: new Date(2020, 6, 15, 12, 1, 1, 100),
      },
      {
        student_id: student,
        question: 'Qual intervalo a ser dado entre as sessões de treino?',
        answer: 'Não sei',
        answer_at: new Date(2020, 8, 15, 12, 1, 1, 100),
        created_at: new Date(2020, 7, 15, 12, 1, 1, 100),
        updated_at: new Date(2020, 8, 15, 12, 1, 1, 100),
      },

      {
        student_id: student,
        question: 'Em que velocidade executar os exercícios?',
        answer: null,
        answer_at: null,
        created_at: new Date(2020, 9, 15, 12, 1, 1, 100),
        updated_at: new Date(2020, 9, 15, 12, 1, 1, 100),
      },
    ]);
  },

  down: queryInterface => queryInterface.bulkDelete('help_orders', null, {}),
};
