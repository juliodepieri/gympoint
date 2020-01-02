import React, { useState, useEffect, useRef } from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

import { formatQuantity, formatPrice } from '~/util/format';

export default function CurrencyInput({ name, label, isCurrency, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [formattedValue, setFormattedValue] = useState(defaultValue);
  const [numberValue, setNumberValue] = useState(defaultValue);

  useEffect(() => {
    if (isCurrency) {
      setFormattedValue(formatQuantity(defaultValue));
    } else {
      setFormattedValue(formatPrice(defaultValue));
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
    <>
      <label htmlFor={fieldName}>{label}</label>
      <NumberFormat
        name={fieldName}
        id={fieldName}
        thousandSeparator="."
        decimalSeparator=","
        value={formattedValue}
        numbervalue={numberValue}
        onValueChange={values => {
          setFormattedValue(values.formattedValue);
          setNumberValue(values.value);
        }}
        ref={ref}
        autoComplete="off"
        allowedDecimalSeparators="[',']"
        allowNegative="false"
        decimalScale="2"
        {...rest}
      />
      {error && <span>{error}</span>}
    </>
  );
}

CurrencyInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  isCurrency: PropTypes.bool,
};

CurrencyInput.defaultProps = {
  label: null,
  isCurrency: false,
};
