import React, { useRef, useEffect, useState } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

export default function SelectInput({
  name,
  label,
  options,
  multiple,
  getOptionValue,
  getOptionLabel,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  function parseSelectValue(selectRef) {
    const selectValue = selectRef.props.value;

    if (!multiple) {
      return selectValue || null;
    }

    return selectValue ? selectValue.map(option => option.id) : [];
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
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
        isMulti={multiple}
        ref={ref}
        getOptionValue={getOptionValue}
        getOptionLabel={getOptionLabel}
        value={value}
        onChange={v => setValue(v)}
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  );
}

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  multiple: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  getOptionValue: PropTypes.func,
  getOptionLabel: PropTypes.func,
  rest: PropTypes.element,
};

SelectInput.defaultProps = {
  label: null,
  multiple: false,
  rest: null,
  getOptionValue: option => option.id,
  getOptionLabel: option => option.label,
};
