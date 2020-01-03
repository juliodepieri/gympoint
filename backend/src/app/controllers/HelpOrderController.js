import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation Fails' });
    }

    const { question } = req.body;

    const helpOrder = await HelpOrder.create({
      student_id: req.params.id,
      question,
    });
    return res.json(helpOrder);
  }

  async index(req, res) {
    const { page = 1, pageSize = 20 } = req.query;
    const pageLimit = pageSize > 20 ? 20 : pageSize;

    const query = {
      limit: pageLimit,
      offset: (page - 1) * pageLimit,
      order: ['created_at'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
      ],
    };

    const { id } = req.params;
    if (id) {
      query.where = {
        student_id: id,
      };
    } else {
      query.where = {
        answer: null,
      };
    }

    const helpOrders = await HelpOrder.findAndCountAll(query);
    return res.json(helpOrders);
  }

  async search(req, res) {
    return res.json();
  }
}

export default new HelpOrderController();
