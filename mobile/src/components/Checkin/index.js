import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import { Container, Title, Time } from './styles';

export default function Checkin({ data }) {
  const dateParsed = useMemo(() => {
    if (!data.created_at) return null;

    return formatRelative(parseISO(data.created_at), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.created_at]);

  return (
    <Container>
      <Title>{data.title}</Title>
      <Time>{dateParsed}</Time>
    </Container>
  );
}

Checkin.propTypes = {
  data: PropTypes.shape({
    created_at: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};
