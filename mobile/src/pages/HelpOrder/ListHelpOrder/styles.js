import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background: #f2f2f2;
  flex: 1;
`;

export const Content = styled.View`
  padding: 20px 20px;
  flex: 1;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  padding: 20px 0;
  flex: 1;
`;

export const Loading = styled.ActivityIndicator.attrs({
  color: '#ee4e62',
  size: 50,
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
