import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity, Alert } from 'react-native';

import api from '~/services/api';
import Header from '~/components/Header';

import { Container, Form, FormInput, SubmitButton } from './styles';

function NewHelpOrder({ navigation }) {
  const student = useSelector(state => state.auth.student);
  const [question, setQuestion] = useState();

  async function handleSubmit() {
    try {
      const response = await api.post(`students/${student.id}/help-orders`, {
        question,
      });
      Alert.alert('Sucesso', 'Pedido de ajuda criado com sucesso!');
      navigation.navigate('ListHelpOrder', { helpOrder: response.data });
    } catch (err) {
      Alert.alert('Erro', 'Pedido de ajuda criado com sucesso!');
    }
  }

  return (
    <Container>
      <Header />
      <Form>
        <FormInput
          autoCapitalize="none"
          placeholder="Inclua seu pedido de auxílio"
          onSubmitEditing={handleSubmit}
          value={question}
          multiline
          textAlignVertical="top"
          numberOfLines={8}
          onChangeText={setQuestion}
        />
        <SubmitButton onPress={handleSubmit}>Enviar pedido</SubmitButton>
      </Form>
    </Container>
  );
}

NewHelpOrder.navigationOptions = ({ navigation }) => ({
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

export default withNavigationFocus(NewHelpOrder);
