import Sequelize, { Model } from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        date_of_birth: Sequelize.DATEONLY,
        weight: Sequelize.NUMERIC(5, 2),
        height: Sequelize.NUMERIC(5, 2),
      },
      { sequelize }
    );

    return this;
  }
}

export default Student;
