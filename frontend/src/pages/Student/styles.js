import styled, { createGlobalStyle } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 120px;
  justify-content: space-between;
  align-items: center;

  .confirm-dialog-content {
    width: 90%;
    max-width: 550px;

    p {
      line-height: 1.5em;
      text-align: left;
    }

    p:last-child {
      margin-top: 5px;
      color: #fc3903;
      font-weight: bold;
    }

    strong {
      font-size: 24px;
      line-height: 1.5em;
      color: #444;
    }
  }
`;

export const StudentFilter = styled.div`
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
    width: 142px;
    height: 36px;
    background: #ee4d64;
    border: none;
    border-radius: 4px;
    color: #fff;
    margin-right: 15px;
  }

  input {
    background: rgba(255, 255, 255, 0.1);
    height: 36px;
    width: 237px;
    padding: 0 15px;
    color: #444;

    border: 1px solid #dddddd;
    box-sizing: border-box;
    border-radius: 4px;

    &::placeholder {
      color: rgba(0, 0, 0, 0.4);
    }
  }
`;

export const StudentTable = styled.table`
  width: 100%;
  background: #fff;
  border-radius: 4px;
  padding: 30px 30px 0 30px;
  border-spacing: 0;
  /* border-collapse: collapse; */
  table-layout: fixed;

  thead {
    color: #444;
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
      color: #666;
      border-bottom: 1px solid #eee;
      overflow: hidden;
      text-overflow: ellipsis;

      div {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
`;

export const EditButton = styled.button`
  color: #4d85ee;
  border: none;
  background: none;
  margin: 0 5px;
`;

export const DeleteButton = styled.button`
  color: #de3b3b;
  border: none;
  background: none;
  margin: 0 5px;
`;
