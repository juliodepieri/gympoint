import { parseISO, addMonths } from 'date-fns';
import * as Yup from 'yup';
import Enrollment from '../models/Enrollment';
import Plan from '../models/Plan';

import ConfirmationJob from '../jobs/ConfirmationMail';
import Queue from '../../lib/Queue';
import Student from '../models/Student';

class EnrollmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
      plan_id: Yup.number().required(),
      student_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { start_date, plan_id, student_id } = req.body;

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan not found' });
    }

    const parsedDate = parseISO(start_date);
    const end_date = addMonths(parsedDate, plan.duration);
    const price = plan.duration * plan.price;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student not found' });
    }

    const enrollment = await Enrollment.create({
      start_date,
      end_date,
      price,
      plan_id,
      student_id,
    });

    await Queue.add(ConfirmationJob.key, {
      enrollment,
      student,
      plan,
    });

    return res.json(enrollment);
  }

  async index(req, res) {
    const { page = 1, pageSize = 20 } = req.query;
    const pageLimit = pageSize > 20 ? 20 : pageSize;

    const enrollment = await Enrollment.findAndCountAll({
      limit: pageLimit,
      offset: (page - 1) * pageLimit,
      order: ['start_date'],
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title', 'duration', 'price'],
        },
      ],
    });

    return res.json(enrollment);
  }

  async show(req, res) {
    const { id } = req.params;
    return res.json(
      await Enrollment.findByPk(id, {
        attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['id', 'name', 'email'],
          },
          {
            model: Plan,
            as: 'plan',
            attributes: ['id', 'title', 'duration', 'price'],
          },
        ],
      })
    );
  }

  async delete(req, res) {
    await Enrollment.destroy({
      where: { id: req.params.id },
    });
    return res.status(204).json();
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { start_date, plan_id, student_id } = req.body;

    const enrollment = await Enrollment.findByPk(req.params.id);
    if (!enrollment) {
      return res.status(400).json({ error: 'Enrollment not found' });
    }

    const plan = await Plan.findByPk(plan_id);
    if (!plan) {
      return res.status(400).json({ error: 'Plan not found' });
    }

    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(400).json({ error: 'Student not found' });
    }

    const parsedDate = parseISO(start_date);
    const end_date = addMonths(parsedDate, plan.duration);
    const price = plan.duration * plan.price;

    await enrollment.update({
      student_id,
      plan_id,
      end_date,
      price,
    });

    return res.json({ start_date, end_date, price, plan_id, student_id });
  }
}

export default new EnrollmentController();
