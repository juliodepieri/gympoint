import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Container, Header, Time, Status, Question } from './styles';

export default function CheckinItem({ data }) {
  const dateParsed = useMemo(() => {
    if (!data.answer_at) return null;
    console.tron.log('pergunta', data);

    return formatRelative(parseISO(data.answer_at), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data]);

  return (
    <Container>
      <Header>
        <Status isAnswered={!!data.answer}>
          {data.answer ? 'Respondido' : 'Sem Resposta'}
        </Status>
        <Time>{dateParsed}</Time>
      </Header>
      <Question>{data.question}</Question>
    </Container>
  );
}
