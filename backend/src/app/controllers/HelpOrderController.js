import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';

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
    let helpOrders = {};

    if (req.params.id) {
      helpOrders = await HelpOrder.findAll({
        order: ['created_at'],
        where: {
          student_id: req.params.id,
        },
      });
    } else {
      helpOrders = await HelpOrder.findAll({
        order: ['created_at'],
        where: {
          answer: null,
        },
      });
    }

    return res.json(helpOrders);
  }

  async search(req, res) {
    return res.json();
  }
}

export default new HelpOrderController();
