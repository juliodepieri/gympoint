import React, { useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import PropTypes from 'prop-types';
import api from '~/services/api';
import Header from '~/components/Header';

import { Container, Form, FormInput, SubmitButton } from './styles';

export default function NewHelpOrder({ navigation }) {
  const student = useSelector(state => state.auth.student);
  const [question, setQuestion] = useState();
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);
      await api.post(`students/${student.id}/help-orders`, {
        question,
      });
      navigation.navigate('ListHelpOrder');
      Alert.alert('Sucesso', 'Pedido de auxílio criado com sucesso!');
    } catch (err) {
      Alert.alert('Erro', 'Pedido de auxílio criado com sucesso!');
    } finally {
      setLoading(false);
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
        <SubmitButton loading={loading} onPress={handleSubmit}>
          Enviar pedido
        </SubmitButton>
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

NewHelpOrder.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
