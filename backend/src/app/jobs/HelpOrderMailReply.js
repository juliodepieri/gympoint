import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class HelpOrderMailReply {
  get key() {
    return 'HelpOrderMailReply';
  }

  async handle({ data }) {
    const { helpOrder, student } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Pedido de auxílio respondido',
      template: 'helpOrderReply',
      context: {
        student: student.name,
        question: helpOrder.question,
        answer: helpOrder.answer,
        answerAt: format(
          parseISO(helpOrder.answer_at),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new HelpOrderMailReply();
