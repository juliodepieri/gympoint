import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 15px;
  border-radius: 4px;

  flex-direction: row;
  align-items: center;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  font-size: 16px;
  color: #666;
  width: 100%;
`;
