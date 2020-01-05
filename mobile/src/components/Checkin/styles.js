import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  padding: 20px;
  height: 46px;
  margin-bottom: 10px;
  background: #fff;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #444;
`;

export const Time = styled.Text`
  color: #666;
  font-size: 13px;
  margin-top: 4px;
`;
