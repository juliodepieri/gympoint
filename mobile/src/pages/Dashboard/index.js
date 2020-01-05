import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import { Alert } from 'react-native';

import api from '~/services/api';
import Header from '~/components/Header';
import Button from '~/components/Button';

import Checkin from '~/components/Checkin';

import { Container, Content, List, Loading } from './styles';

function Dashboard() {
  const student = useSelector(state => state.auth.student);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [checkins, setCheckins] = useState([]);

  useEffect(() => {
    async function loadCheckins() {
      const response = await api.get(`students/${student.id}/checkins`, {
        params: {
          page,
        },
      });

      const { rows, count } = response.data;

      const newData = rows.map((checkin, index) => ({
        ...checkin,
        title: `Check-in #${count - ((page - 1) * 10 + index)} `,
      }));

      setCheckins(c => (page >= 2 ? [...c, ...newData] : newData));
    }

    try {
      setLoading(true);
      loadCheckins();
    } catch (err) {
      Alert.alert('Falha', 'Não foi possível carregar a lista de check-ins');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [page, student.id]);

  function loadMore() {
    setPage(page + 1);
  }

  async function refreshCheckins() {
    setRefreshing(true);
    setPage(1);
  }

  async function handleNewCheckin() {
    try {
      setLoading(true);
      await api.post(`students/${student.id}/checkins`, {});
      refreshCheckins();
    } catch (err) {
      Alert.alert(
        'Falha',
        `Não foi possível incluir o check-in: ${err.response.data.error}`
      );
    }
  }

  return (
    <Container>
      <Header />
      <Content>
        <Button onPress={handleNewCheckin} loading={loading}>
          Novo check-in
        </Button>
        {loading ? (
          <Loading />
        ) : (
          <List
            data={checkins}
            keyExtractor={item => String(item.id)}
            onEndReached={loadMore}
            onEndReachedThreshold={0.1}
            onRefresh={refreshCheckins}
            refreshing={refreshing}
            renderItem={({ item }) => <Checkin data={item} />}
          />
        )}
      </Content>
    </Container>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="edit-location" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
