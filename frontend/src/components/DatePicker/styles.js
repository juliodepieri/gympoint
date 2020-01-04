import styled from 'styled-components';
import colors from '~/styles/colors';

export const Container = styled.div`
  input:disabled {
    background-color: ${colors.inputDisabled};
  }
`;
