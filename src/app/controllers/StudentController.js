import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
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

    const user = await Student.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await Student.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'Student already exists.' });
      }
    }

    const { id, name, birthOfDate, weight, height } = await user.update(
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
}

export default new StudentController();
