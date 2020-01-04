import styled from 'styled-components';

import { FormContent } from '~/pages/_layouts/form/styles';

export const Content = styled(FormContent)`
  .row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
    margin: 20px 0 30px 0;
  }
`;
