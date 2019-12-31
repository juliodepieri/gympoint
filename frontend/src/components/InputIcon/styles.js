import styled from 'styled-components';
import colors from '~/styles/colors';

export const Container = styled.div`
  display: flex;
  align-items: center;
  background: ${colors.inputBackground};
  border: 1px solid ${colors.inputBorder};
  border-radius: 4px;

  svg {
    width: 16px;
    height: 16px;
    color: ${colors.textDisable};
    margin-left: 15px;
  }

  input {
    height: 45px;
    width: 100%;
    background: none;
    color: ${colors.textLabel};
    font-size: 16px;
    border: none;
    padding: 0 15px;

    &::placeholder {
      color: ${colors.textDisable};
    }
  }
`;
