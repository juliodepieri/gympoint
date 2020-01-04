import styled, { css } from 'styled-components';
import { darken } from 'polished';
import colors from '~/styles/colors';

export const PaginationWrapper = styled.div`
  width: 100%;
  background-color: ${colors.backgroundData};
  display: flex;
  justify-content: center;
  border-radius: 0 0 4px 4px;
`;

export const Button = styled.button`
  background: none;
  border: 1px solid ${colors.paginatorBorder};
  width: 22px;
  height: 22px;
  border-radius: 4px;
  color: ${colors.text};

  ${props =>
    props.active &&
    css`
      background: ${darken(0.03, colors.primary)};
      color: ${colors.buttonText};
    `};
`;
