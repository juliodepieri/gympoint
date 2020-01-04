import styled, { keyframes } from 'styled-components';
import { darken } from 'polished';
import colors from '~/styles/colors';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Wrapper = styled.div`
  height: 100%;
  background: ${colors.backgroundDefault};

  table {
    width: 100%;
    background: ${colors.backgroundData};
    border-radius: 4px;
    padding: 30px 30px 0 30px;
    border-spacing: 0;
    table-layout: fixed;

    thead {
      color: ${colors.textLabel};
      font-size: 16px;
      text-align: left;
      vertical-align: bottom;
    }

    colgroup {
      col {
        &:last-child {
          width: 75px;
        }
      }
    }

    tbody tr {
      height: 54px;

      &:first-child {
        border-top: none;
      }

      &:last-child {
        border-bottom: none;
      }

      td {
        color: ${colors.text};
        border-bottom: 1px solid ${colors.tableLine};
        overflow: hidden;
        text-overflow: ellipsis;

        div {
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  }
`;

export const Container = styled.div.attrs({
  id: 'container',
})`
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 120px;
  justify-content: space-between;
  align-items: center;

  > svg {
    height: 20px;
    width: 20px;
    margin-right: 5px;
    animation: ${rotate} 2s linear infinite;
  }

  .confirm-dialog-content {
    width: 90%;
    max-width: 550px;

    p {
      line-height: 1.5em;
      text-align: left;
    }

    p:last-child {
      margin-top: 5px;
      color: ${colors.warning};
      font-weight: bold;
    }

    strong {
      font-size: 24px;
      line-height: 1.5em;
      color: ${colors.textLabel};
    }
  }
`;

export const Title = styled.div`
  display: flex;
  width: 100%;
  height: 86px;
  padding-top: 16px;
  align-items: center;
  justify-content: space-between;

  button {
    width: 142px;
    height: 36px;
    background: ${colors.primary};
    border: none;
    border-radius: 4px;
    color: ${colors.buttonText};
    margin-right: 15px;
    font-weight: bold;
  }

  button:hover {
    transition: background 0.2s;
    background: ${darken(0.03, colors.primary)};
  }

  strong {
    font-size: 24px;
    color: ${colors.textLabel};
  }
`;

export const EditButton = styled.button`
  color: ${colors.blue};
  border: none;
  background: none;
  margin: 0 5px;
`;

export const DeleteButton = styled.button`
  color: ${colors.red};
  border: none;
  background: none;
  margin: 0 5px;
`;
