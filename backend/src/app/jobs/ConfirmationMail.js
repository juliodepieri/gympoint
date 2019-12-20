import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class ConfirmationMail {
  get key() {
    return 'ConfirmationEmail';
  }

  async handle({ data }) {
    const { enrollment, student, plan } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Enrollment Details',
      template: 'enrollmentConfirmation',
      context: {
        student: student.name,
        plan: plan.tittle,
        endDate: format(
          parseISO(enrollment.end_date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new ConfirmationMail();
