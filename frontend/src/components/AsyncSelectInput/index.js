import React, { useEffect, useRef, useState } from 'react';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

export default function SelectInput({
  name,
  label,
  loadOptions,
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
    return selectRef.props.value || null;
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
      <label htmlFor={fieldName}>{label}</label>
      <AsyncSelect
        name={fieldName}
        aria-label={fieldName}
        id={fieldName}
        cacheOptions
        isClearable
        className="async-select"
        classNamePrefix="async-select"
        value={value}
        onChange={v => setValue(v)}
        loadOptions={inputValue => loadOptions(inputValue)}
        getOptionValue={getOptionValue}
        getOptionLabel={getOptionLabel}
        ref={ref}
        {...rest}
      />
      {error && <span>{error}</span>}
    </>
  );
}

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  loadOptions: PropTypes.func.isRequired,
  getOptionValue: PropTypes.func,
  getOptionLabel: PropTypes.func,
  rest: PropTypes.element,
};

SelectInput.defaultProps = {
  label: null,
  rest: null,
  getOptionValue: option => option.id,
  getOptionLabel: option => option.label,
};
