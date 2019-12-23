import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    padding: 30px;
    width: 360px;
    background: #fff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    border-radius: 4px;

    img {
      margin: 15px 0 30px;
    }

    label {
      color: #444444;
      font-weight: bold;
      text-align: left;
      margin: 25px 0 5px 0;
    }

    input {
      background: rgba(255, 255, 255, 0.1);
      height: 44px;
      padding: 0 15px;
      color: #444444;

      border: 1px solid #dddddd;
      box-sizing: border-box;
      border-radius: 4px;

      &::placeholder {
        color: rgba(0, 0, 0, 0.4);
      }
    }

    button {
      margin: 25px 0 0;
      height: 44px;
      background: #ee4d64;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#3b9eff')};
      }
    }

    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
