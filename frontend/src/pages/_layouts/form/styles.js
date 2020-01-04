import styled from 'styled-components';
import { darken } from 'polished';

import colors from '~/styles/colors';

export const Wrapper = styled.div`
  height: 100%;
  background: ${colors.backgroundDefault};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
`;

export const FormHeader = styled.div`
  display: flex;
  width: 100%;
  height: 86px;
  padding-top: 16px;
  align-items: center;
  justify-content: space-between;
  background: none;

  strong {
    font-size: 24px;
    color: ${colors.textLabel};
  }

  button:first-child {
    background: ${colors.grey};
  }

  button:first-child:hover {
    transition: background 0.2s;
    background: ${darken(0.03, colors.grey)};
  }

  button {
    width: 112px;
    height: 36px;
    background: ${colors.primary};
    border: none;
    border-radius: 4px;
    color: ${colors.buttonText};
    margin-left: 15px;
    font-weight: bold;
  }

  button:last-child:hover {
    transition: background 0.2s;
    background: ${darken(0.03, colors.primary)};
  }
`;

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 30px 0 30px;
  background: ${colors.backgroundData};

  label {
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    margin-top: 20px;

    color: ${colors.textLabel};
  }

  input {
    width: 100%;
    background: ${colors.inputBackground};
    width: 100%;
    padding: 0 15px;
    color: ${colors.text};
    height: 36px;
    margin-top: 8px;

    border: 1px solid ${colors.inputBorder};
    box-sizing: border-box;
    border-radius: 4px;

    &::placeholder {
      color: ${colors.textDisable};
    }
  }

  .async-select__single-value,
  .select__single-value {
    color: ${colors.text};
  }

  .async-select,
  .select {
    height: 36px;
    min-width: 200px;
    margin-top: 8px;
    color: ${colors.text};

    .async-select__placeholder,
    .select__placeholder {
      color: ${colors.textDisable};
    }

    input {
      height: auto;
    }
  }
`;
