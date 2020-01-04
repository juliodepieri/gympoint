import styled, { keyframes } from 'styled-components';
import colors from '~/styles/colors';

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

export const ModalBackground = styled.div`
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const Modal = styled.div`
  display: block;
  position: absolute;
  background-color: #fefefe;
  width: 50%;
  max-width: 450px;
  min-height: 50px;
  padding: 0;
  border: 1px solid #888;

  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation: ${animatetop} 0.4s;
`;

export const ModalHeader = styled.div`
  padding: 0 8px;
  color: white;
  height: 30px;
  text-align: right;
`;

export const ModalBody = styled.div`
  padding: 0 30px 30px;

  p {
    color: ${colors.text};
    font-size: 16px;
    line-height: 26px;
    margin-bottom: 20px;
    margin-top: 8px;
  }

  label {
    font-weight: bold;
  }

  strong,
  label {
    color: ${colors.textLabel};
    font-size: 14px;
    line-height: 16px;
  }

  button {
    width: 100%;
    height: 45px;
    background: ${colors.primary};
    border: none;
    border-radius: 4px;
    color: ${colors.buttonText};
    margin-right: 15px;
    font-size: 16px;
    font-weight: bold;
    margin-top: 21px;
  }

  textarea {
    width: 100%;
    padding: 13px 15px;
    background: ${colors.inputBackground};
    border: 1px solid ${colors.inputBorder};
    color: ${colors.text};
    border-radius: 4px;
    margin-top: 8px;
    min-height: 125px;
  }
`;

export const CloseButton = styled.button`
  color: ${colors.textDisable};
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
