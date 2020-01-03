import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const plans = await Plan.findAndCountAll({
      limit: 20,
      offset: (page - 1) * 20,
      order: ['duration'],
      attributes: ['id', 'title', 'duration', 'price'],
    });

    return res.json(plans);
  }

  async show(req, res) {
    const { id } = req.params;
    return res.json(await Plan.findByPk(id));
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .min(1)
        .required(),
      price: Yup.number()
        .min(0)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation Fails' });
    }

    const titleExists = await Plan.findOne({
      where: { title: req.body.title },
    });

    if (titleExists) {
      return res
        .status(400)
        .json({ error: 'Plan with this title already exists' });
    }

    const { id, title, duration, price } = await Plan.create(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .min(1)
        .required(),
      price: Yup.number()
        .min(0)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation Fails' });
    }

    const plan = await Plan.findByPk(req.params.id);

    const { id, title, duration, price } = await plan.update(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async delete(req, res) {
    await Plan.destroy({
      where: { id: req.params.id },
    });
    return res.status(204).json();
  }
}

export default new PlanController();
