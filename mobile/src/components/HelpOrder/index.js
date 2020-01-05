import React, { useMemo } from 'react';

import PropTypes from 'prop-types';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Header, Time, Status, Question, Info } from './styles';

export default function HelpOrder({ data }) {
  const dateParsed = useMemo(() => {
    if (!data.answer_at) return null;
    console.tron.log('pergunta', data);

    return formatRelative(parseISO(data.answer_at), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data]);

  const status = useMemo(
    () => (data.answer_at ? 'Respondido' : 'Sem resposta'),
    [data.answer_at]
  );

  return (
    <Container>
      <Header>
        <Info isAnswered={!!data.answer_at}>
          {data.answer_at ? (
            <Icon name="check-circle" size={20} color="#42CB59" />
          ) : (
            <Icon name="hourglass-empty" size={20} color="#999" />
          )}
          <Status>{status}</Status>
        </Info>
        <Time>{dateParsed}</Time>
      </Header>
      <Question>{data.question}</Question>
    </Container>
  );
}

HelpOrder.propTypes = {
  data: PropTypes.shape({
    created_at: PropTypes.string,
    answer_at: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
};
