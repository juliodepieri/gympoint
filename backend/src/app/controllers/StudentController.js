import * as Yup from 'yup';
import Sequelize, { Op } from 'sequelize';
import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const { name, page = 1 } = req.query;
    const query = {
      limit: 20,
      offset: (page - 1) * 20,
      order: ['name'],
      attributes: ['id', 'name', 'email', 'dateOfBirth', 'weight', 'height'],
    };

    if (name) {
      query.where = {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      };
    }

    const students = await Student.findAll(query);

    return res.json(students);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      dateOfBirth: Yup.date().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation Fails' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists' });
    }

    const { name, email, birthOfDate, weight, height } = await Student.create(
      req.body
    );

    return res.json({
      name,
      email,
      birthOfDate,
      weight,
      height,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      dateOfBirth: Yup.date().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation Fails' });
    }

    const { email } = req.body;

    const student = await Student.findByPk(req.params.id);

    if (email !== student.email) {
      const studentExists = await Student.findOne({ where: { email } });

      if (studentExists) {
        return res.status(400).json({ error: 'Student already exists.' });
      }
    }

    const { id, name, birthOfDate, weight, height } = await student.update(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      birthOfDate,
      weight,
      height,
    });
  }

  async delete(req, res) {
    await Student.destroy({
      where: { id: req.params.id },
    });
    return res.status(204).json();
  }
}

export default new StudentController();
