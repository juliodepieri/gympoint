import styled from 'styled-components';
import colors from '~/styles/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 120px;
  justify-content: space-between;
  align-items: center;
`;

export const RegisterHeader = styled.div`
  display: flex;
  width: 100%;
  height: 86px;
  padding-top: 16px;
  align-items: center;
  justify-content: space-between;

  strong {
    font-size: 24px;
    color: ${colors.textLabel};
  }

  button {
    width: 112px;
    height: 36px;
    background: ${colors.primary};
    border: none;
    border-radius: 4px;
    color: ${colors.buttonText};
    margin-right: 15px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 30px 0 30px;
  background: ${colors.backgroundData};

  label {
    /* font-family: Roboto; */
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;

    color: ${colors.textLabel};
    margin-top: 20px;
  }

  input {
    width: 100%;
    background: ${colors.inputBackground};
    width: 100%;
    padding: 0 15px;
    color: ${colors.textLabel};

    border: 1px solid ${colors.inputBorder};
    box-sizing: border-box;
    border-radius: 4px;
    margin-right: 16px;

    &::placeholder {
      color: ${colors.textDisable};
    }
  }

  .select {
    margin-top: 8px;

    div {
      color: ${colors.textLabel};
    }
  }

  .row {
    column-count: 3;
    column-gap: 16px;
    margin: 20px 0 30px 0;

    input {
      height: 36px;
      margin-top: 8px;
    }
  }
`;
