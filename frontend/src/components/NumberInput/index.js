import React, { useState, useEffect, useRef } from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

import { formatQuantity, formatPrice } from '~/util/format';

import { Container } from './styles';

export default function CurrencyInput({
  name,
  label,
  isCurrency,
  onValueChange,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [formattedValue, setFormattedValue] = useState(defaultValue);
  const [numberValue, setNumberValue] = useState(defaultValue);

  useEffect(() => {
    if (isCurrency) {
      setFormattedValue(formatPrice(defaultValue));
    } else {
      setFormattedValue(formatQuantity(defaultValue));
    }
  }, [defaultValue, isCurrency]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.numbervalue',
      clearValue: weightRef => {
        weightRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <Container>
      <label htmlFor={fieldName}>{label}</label>
      <NumberFormat
        name={fieldName}
        id={fieldName}
        thousandSeparator="."
        decimalSeparator=","
        prefix={isCurrency ? 'R$ ' : undefined}
        value={formattedValue}
        numbervalue={numberValue}
        onValueChange={values => {
          setFormattedValue(values.formattedValue);
          setNumberValue(values.value);

          if (onValueChange) {
            onValueChange(values.value);
          }
        }}
        ref={ref}
        autoComplete="off"
        allowedDecimalSeparators="[',']"
        allowNegative="false"
        decimalScale="2"
        {...rest}
      />
      {error && <span>{error}</span>}
    </Container>
  );
}

CurrencyInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  isCurrency: PropTypes.bool,
  onValueChange: PropTypes.func,
};

CurrencyInput.defaultProps = {
  label: null,
  isCurrency: false,
  onValueChange: null,
};
