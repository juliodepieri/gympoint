import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    ul {
      display: flex;

      li {
        margin: 0 10px 0;
      }
    }

    a {
      font-weight: bold;
      color: #999999;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #666;
      font-size: 14px;
    }

    button {
      text-align: left;
      margin-top: 2px;
      font-size: 12px;
      color: #de3b3b;
      background: none;
      border: none;

      transition: background 0.2s;

      &:hover {
        color: ${darken(0.1, '#DE3B3B')};
      }
    }
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
`;
