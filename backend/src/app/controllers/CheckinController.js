import { startOfDay, subDays } from 'date-fns';
import { Op } from 'sequelize';
import Checkin from '../models/Checkin';

class ChekinController {
  async store(req, res) {
    const count = await Checkin.count({
      where: {
        student_id: req.params.id,
        created_at: {
          [Op.gte]: subDays(startOfDay(new Date()), 7),
        },
      },
    });

    if (count >= 5) {
      return res.status(400).json({
        error: 'limit of 5 check-in within 7 days reached',
      });
    }

    const checkin = await Checkin.create({ student_id: req.params.id });
    return res.json(checkin);
  }

  async index(req, res) {
    const { page = 1, pageSize = 10 } = req.query;
    const pageLimit = pageSize > 10 ? 10 : pageSize;

    const checkin = await Checkin.findAndCountAll({
      limit: pageLimit,
      offset: (page - 1) * pageLimit,
      order: [['created_at', 'DESC']],
      attributes: ['id', 'student_id', 'created_at', 'updated_at'],
    });

    return res.json(checkin);
  }
}

export default new ChekinController();
