import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const plans = await Plan.findAll({
      limit: 20,
      offset: (page - 1) * 20,
      order: ['duration'],
      attributes: ['tittle', 'duration', 'price'],
    });

    return res.json(plans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      tittle: Yup.string().required(),
      duration: Yup.string()
        .min(1)
        .required(),
      price: Yup.number()
        .min(0)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation Fails' });
    }

    const tittleExists = await Plan.findOne({
      where: { tittle: req.body.tittle },
    });

    if (tittleExists) {
      return res
        .status(400)
        .json({ error: 'Plan with this tittle already exists' });
    }

    const { id, tittle, duration, price } = await Plan.create(req.body);

    return res.json({
      id,
      tittle,
      duration,
      price,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      tittle: Yup.string().required(),
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

    const { id, tittle, duration, price } = await plan.update(req.body);

    return res.json({
      id,
      tittle,
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
