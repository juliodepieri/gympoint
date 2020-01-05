import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Container, Title, Time } from './styles';

export default function CheckinItem({ data }) {
  const dateParsed = useMemo(() => {
    if (!data.created_at) return;

    return formatRelative(parseISO(data.created_at), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data]);

  return (
    <Container>
      <Title>{data.title}</Title>
      <Time>{dateParsed}</Time>
    </Container>
  );
}
