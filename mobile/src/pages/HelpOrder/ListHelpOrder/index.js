import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity, Alert } from 'react-native';

import api from '~/services/api';
import Header from '~/components/Header';
import Button from '~/components/Button';
import HelpOrder from '~/components/HelpOrder';

import { Container, Content, List, Loading } from './styles';

function ListHelpOrder({ isFocused, navigation }) {
  const student = useSelector(state => state.auth.student);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [helpOrders, setHelpOrders] = useState([]);

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get(`students/${student.id}/help-orders`, {
        params: {
          page,
        },
      });

      const { rows, count } = response.data;

      const newData = rows.map((order, index) => ({
        ...order,
        title: `Check-in #${count - ((page - 1) * 10 + index)} `,
      }));

      setHelpOrders(c => (page >= 2 ? [...c, ...newData] : newData));
    }

    try {
      setLoading(true);
      if (isFocused) {
        loadHelpOrders();
      }
    } catch (err) {
      Alert.alert('Falha', 'Não foi possível carregar a lista de check-ins');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [isFocused, page, student.id]);

  function loadMore() {
    setPage(p => p + 1);
  }

  async function refreshHelpOrders() {
    setRefreshing(true);
    setPage(1);
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
        {loading && <Loading />}
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

export default withNavigationFocus(ListHelpOrder);
