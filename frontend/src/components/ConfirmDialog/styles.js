import styled, { keyframes } from 'styled-components';

const animatetop = keyframes`
  0% {
    top: 0%;
    opacity: 0;
  }

  100% {
    top: 50%;
    opacity: 1;
  }
`;

export const Background = styled.div`
  display: 'block';
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const Content = styled.div`
  background-color: #fefefe;
  min-height: 50px;
  border: 1px solid #888;

  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation: ${animatetop} 0.4s;
  padding: 0;
`;

export const Header = styled.div`
  padding: 2px 14px;
  background-color: #ee4d64;
  color: white;
  text-align: left;
`;

export const CloseButton = styled.button`
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  background: none;
  border: 0;
  margin: 0;

  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

export const Body = styled.div`
  padding: 15px;
`;

export const Footer = styled.div`
  text-align: right;
  border-top: 1px solid #ee4d64;
  padding: 4px;

  button {
    width: 110px;
    height: 36px;
    background: #ee4d64;
    border: none;
    border-radius: 4px;
    color: #fff;
    margin-right: 15px;
    font-size: 16px;
    font-weight: bold;
  }

  .cancelar {
    background: #ccc;
  }
`;
