import React, { useRef, useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import { utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';

import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';
import { parseISO } from 'date-fns';
import { Container } from './styles';

export default function DatePicker({ name, label, onChange, disabled }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    if (defaultValue) {
      setSelected(utcToZonedTime(defaultValue, timezone));
    }
  }, [defaultValue, timezone]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <Container>
      <label htmlFor={fieldName}>{label}</label>
      <ReactDatePicker
        name={fieldName}
        id={fieldName}
        selected={selected}
        onChange={date => {
          setSelected(utcToZonedTime(date));
          if (onChange) {
            onChange(utcToZonedTime(date));
          }
        }}
        ref={ref}
        autoComplete="off"
        dateFormat="P"
        locale={pt}
        disabled={disabled}
        customInput={
          <MaskedInput
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
          />
        }
      />
      {error && <span>{error}</span>}
    </Container>
  );
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

DatePicker.defaultProps = {
  label: null,
  onChange: null,
  disabled: false,
};
