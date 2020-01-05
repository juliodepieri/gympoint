import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import { TouchableOpacity } from 'react-native';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Header from '~/components/Header';
import {
  Container,
  HeaderQuestion,
  Title,
  Time,
  Content,
  Question,
  Answer,
} from './styles';

function ShowHelpOrder({ navigation }) {
  const helpOrder = navigation.getParam('helpOrder');

  const dateParsed = useMemo(() => {
    console.tron.log(helpOrder);
    if (!helpOrder || !helpOrder.answer_at) return null;

    return formatRelative(parseISO(helpOrder.answer_at), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [helpOrder]);

  return (
    <Container>
      <Header />
      <Content>
        <HeaderQuestion>
          <Title>PERGUNTA</Title>
          <Time>{dateParsed}</Time>
        </HeaderQuestion>
        <Question>{helpOrder.question}</Question>

        <HeaderQuestion>
          <Title>RESPOSTA</Title>
        </HeaderQuestion>
        <Answer>
          {helpOrder.answer
            ? helpOrder.answer
            : 'Não há resposta até o momento.'}
        </Answer>
      </Content>
    </Container>
  );
}

ShowHelpOrder.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={20} color="#ee4e62" />
    </TouchableOpacity>
  ),
});

export default withNavigationFocus(ShowHelpOrder);
