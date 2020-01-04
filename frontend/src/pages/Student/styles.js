import styled from 'styled-components';
import { Title } from '~/pages/_layouts/list/styles';

export const TitleStudent = styled(Title)`
  > div {
    display: flex;
    align-items: center;

    input {
      height: 36px;
      width: 237px;
      padding: 0 8px 0 15px;
    }
  }
`;
