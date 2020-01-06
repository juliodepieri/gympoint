import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import PropTypes from 'prop-types';
import api from '~/services/api';
import Header from '~/components/Header';
import Button from '~/components/Button';
import HelpOrder from '~/components/HelpOrder';

import { Container, Content, List } from './styles';

function ListHelpOrder({ isFocused, navigation }) {
  const student = useSelector(state => state.auth.student);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [helpOrders, setHelpOrders] = useState([]);

  useEffect(() => {
    console.tron.log('focused', isFocused);
  });

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get(`students/${student.id}/help-orders`, {
        params: {
          page,
        },
      });

      const { rows } = response.data;
      setHelpOrders(c => (page >= 2 ? [...c, ...rows] : rows));
      setLoading(false);
    }

    try {
      setRefreshing(true);
      setLoading(true);
      loadHelpOrders();
    } catch (err) {
      setLoading(false);
      Alert.alert('Falha', 'Não foi possível carregar a lista de check-ins');
    } finally {
      setRefreshing(false);
    }
  }, [isFocused, page, student.id]);

  function loadMore() {
    setPage(p => p + 1);
  }

  async function refreshHelpOrders() {
    if (page !== 1) {
      setPage(1);
    }
  }

  async function handleNewHelpOrder() {
    navigation.navigate('NewHelpOrder');
  }

  return (
    <Container>
      <Header />
      <Content>
        <Button onPress={handleNewHelpOrder} loading={loading}>
          Novo pedido de auxílio
        </Button>
        <List
          data={helpOrders}
          keyExtractor={item => String(item.id)}
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
          onRefresh={refreshHelpOrders}
          refreshing={refreshing}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ShowHelpOrder', { helpOrder: item })
              }
            >
              <HelpOrder data={item} />
            </TouchableOpacity>
          )}
        />
      </Content>
    </Container>
  );
}

ListHelpOrder.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Dashboard');
      }}
    >
      <Icon name="chevron-left" size={20} color="#ee4e62" />
    </TouchableOpacity>
  ),
});

ListHelpOrder.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(ListHelpOrder);
