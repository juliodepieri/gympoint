import styled from 'styled-components';

import { FormContent } from '~/pages/_layouts/form/styles';

export const Content = styled(FormContent)`
  > div {
    column-count: 3;
    column-gap: 16px;
    margin: 20px 0 30px 0;
  }
`;
