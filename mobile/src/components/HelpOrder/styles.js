import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  padding: 20px;
  width: 100%;
  background: #fff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const Header = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Info = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: space-between;
`;

export const Status = styled.Text`
  color: ${props => (props.isAnswered ? '#42CB59' : '#999')};
  margin-left: 5px;
  font-weight: bold;
  font-size: 14px;
`;

export const Time = styled.Text`
  color: #666;
  font-size: 14px;
`;

export const Question = styled.Text.attrs({
  numberOfLines: 3,
})`
  color: #666;
  font-size: 14px;
  margin-top: 16px;
`;
