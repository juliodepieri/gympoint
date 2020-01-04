import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import { Alert } from 'react-native';

import api from '~/services/api';

import Background from '~/components/Background';
import Checkin from '~/components/Checkin';

import { Container, Title, List, Loading } from './styles';

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

      const newData = response.data.rows.map((checkin, index) => ({
        ...checkin,
        title: `Check-in #${(page - 1) * 10 + (index + 1)} `,
      }));

      const data = page >= 2 ? [...checkins, ...newData] : newData;
      setCheckins(data);
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
  }, [checkins, page, student.id]);

  async function loadMoreCheckins() {
    setPage(page + 1);
  }

  async function refreshCheckins() {
    setRefreshing(true);
    setPage(1);
  }

  return (
    <Background>
      <Container>
        <Title>Checkins</Title>
        {loading ? (
          <Loading />
        ) : (
          <List
            data={checkins}
            keyExtractor={item => String(item.id)}
            onEndReachedThreshold={0.2}
            onEndReached={loadMoreCheckins}
            onRefresh={refreshCheckins}
            refreshing={refreshing}
            renderItem={({ item }) => <Checkin data={item} />}
          />
        )}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Check-in',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
