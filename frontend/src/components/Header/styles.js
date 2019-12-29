import styled from 'styled-components';
import colors from '~/styles/colors';

export const Container = styled.div`
  background: ${colors.backgroundHeader};
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
      border-right: 1px solid ${colors.separator};
    }

    ul {
      display: flex;

      li {
        margin: 0 10px 0;
      }
    }

    a {
      font-weight: bold;
      color: ${colors.textDisable};
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

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: ${colors.text};
      font-size: 14px;
    }

    button {
      text-align: left;
      margin-top: 2px;
      font-size: 12px;
      color: ${colors.red};
      background: none;
      border: none;
    }
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
`;
