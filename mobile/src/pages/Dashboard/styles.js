import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #444;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;

export const Loading = styled.ActivityIndicator.attrs({
  color: '#ee4e62',
  size: 50,
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
