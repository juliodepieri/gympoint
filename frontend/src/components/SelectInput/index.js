import React, { useRef, useEffect, useState } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

export default function SelectInput({
  name,
  label,
  options,
  getOptionValue,
  getOptionLabel,
  onChange,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  function parseSelectValue(selectRef) {
    return selectRef.props.value;
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <Select
        name={fieldName}
        aria-label={fieldName}
        className="select"
        classNamePrefix="select"
        options={options}
        ref={ref}
        getOptionValue={getOptionValue}
        getOptionLabel={getOptionLabel}
        value={value}
        onChange={v => {
          setValue(v);
          if (onChange) {
            onChange(v);
          }
        }}
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  );
}

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  getOptionValue: PropTypes.func,
  getOptionLabel: PropTypes.func,
  rest: PropTypes.element,
  onChange: PropTypes.func,
};

SelectInput.defaultProps = {
  label: null,
  rest: null,
  getOptionValue: option => option.id,
  getOptionLabel: option => option.label,
  onChange: null,
};
