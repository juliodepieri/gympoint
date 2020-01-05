import React from 'react';
import PropTypes from 'prop-types';

import Header from '~/components/Header';
import { Wrapper, Container } from './styles';

export default function FormLayout({ children }) {
  return (
    <Wrapper>
      <Header />
      <Container>{children}</Container>
    </Wrapper>
  );
}

FormLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
