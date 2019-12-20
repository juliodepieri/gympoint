import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import HelpOrderReplyJob from '../jobs/HelpOrderMailReply';
import Queue from '../../lib/Queue';

class AnswerController {
  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation Fails' });
    }

    const { answer } = req.body;

    const helpOrder = await HelpOrder.findByPk(req.params.id);
    await helpOrder.update({ answer, answer_at: new Date() });

    const student = await Student.findByPk(helpOrder.student_id);

    await Queue.add(HelpOrderReplyJob.key, {
      student,
      helpOrder,
    });

    return res.json(helpOrder);
  }
}

export default new AnswerController();
