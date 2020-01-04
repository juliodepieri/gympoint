import * as Yup from 'yup';

import Enrollment from '../models/Enrollment';
import Student from '../models/Student';

class SessionStudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.body;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({ error: 'Student does not exists.' });
    }

    const enrollment = await Enrollment.findOne({
      where: { student_id: id },
    });

    if (!enrollment || !enrollment.active) {
      return res
        .status(401)
        .json({ error: 'Student does not have one active enrollment.' });
    }

    const { endDate } = enrollment;

    return res.json({
      student,
      currentContractEnd: endDate,
    });
  }
}

export default new SessionStudentController();
