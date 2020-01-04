import styled from 'styled-components';
import colors from '~/styles/colors';

export const ContainerHelpOrder = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1100px;
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

export const AnswerButton = styled.button`
  color: ${colors.blue};
  border: none;
  background: none;
  margin: 0 5px;
`;
