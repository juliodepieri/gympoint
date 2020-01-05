import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background: #f2f2f2;
  height: 100%;
`;

export const Content = styled.View`
  background: #fff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  margin: 20px;
  padding: 20px;
`;

export const HeaderQuestion = styled.View`
  width: 100%;
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
  font-size: 14px;
`;

export const Question = styled.Text`
  color: #666;
  font-size: 14px;
  margin: 26px 0 20px 0;
`;

export const Answer = styled.Text`
  color: #666;
  font-size: 14px;
  margin: 26px 0 0;
`;
