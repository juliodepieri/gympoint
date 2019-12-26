import styled from 'styled-components';

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
    color: #444;
  }

  button {
    width: 112px;
    height: 36px;
    background: #ee4d64;
    border: none;
    border-radius: 4px;
    color: #fff;
    margin-right: 15px;
  }

  /* #CCCCCC  */
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 30px 0 30px;
  background: #fff;

  label {
    /* font-family: Roboto; */
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;

    color: #444;
    margin-top: 20px;
  }

  input {
    width: 100%;
    background: rgba(255, 255, 255, 0.1);
    height: 36px;
    width: 100%;
    padding: 0 15px;
    color: #444;

    border: 1px solid #dddddd;
    box-sizing: border-box;
    border-radius: 4px;
    margin-right: 16px;
    margin-top: 8px;

    &::placeholder {
      color: rgba(0, 0, 0, 0.4);
    }
  }

  > div {
    column-count: 3;
    column-gap: 16px;
    margin: 20px 0 30px 0;
  }
`;
