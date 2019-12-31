import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function InputIcon({ children, ...rest }) {
  return (
    <Container className="teste">
      {children}
      <input {...rest} />
    </Container>
  );
}
InputIcon.propTypes = {
  children: PropTypes.element,
};

InputIcon.defaultProps = {
  children: null,
};
