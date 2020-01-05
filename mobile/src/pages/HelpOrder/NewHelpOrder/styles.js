import styled from 'styled-components/native';
import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  background: #f2f2f2;
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 20 },
})`
  align-self: stretch;
`;

export const FormInput = styled(Input)`
  font-size: 16px;
  line-height: 19px;
  color: #999999;
  background: #fff;
  border: 1px solid #ddd;
`;

export const SubmitButton = styled(Button)`
  margin-top: 20px;
`;
