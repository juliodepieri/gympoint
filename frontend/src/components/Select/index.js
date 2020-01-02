import React, { useEffect, useRef, useState } from 'react';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

export default function Select({
  name,
  label,
  loadOptions,
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
    const selectValue = selectRef.select.state.value;

    if (!multiple) {
      return selectValue || '';
    }

    return selectValue ? selectValue.map(option => option.id) : [];
  }

  function getDefaultValue() {
    if (!defaultValue) return null;

    const { options } = ref.current.select.props;

    if (!multiple) {
      return options.find(option => option.id === defaultValue.id);
    }

    return options.filter(option => defaultValue.includes(option.id));
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'select.state.value',
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
        cacheOptions
        defaultOptions
        isClearable
        className="async"
        classNamePrefix="select"
        value={value}
        loadOptions={inputValue => loadOptions(inputValue)}
        name={fieldName}
        id={fieldName}
        isMulti={multiple}
        defaultValue={getDefaultValue()}
        getOptionValue={getOptionValue}
        getOptionLabel={getOptionLabel}
        onChange={v => setValue(v)}
        ref={ref}
        {...rest}
      />
      {error && <span>{error}</span>}
    </>
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  multiple: PropTypes.bool,
  loadOptions: PropTypes.func.isRequired,
  getOptionValue: PropTypes.func,
  getOptionLabel: PropTypes.func,
  rest: PropTypes.element,
};

Select.defaultProps = {
  label: null,
  multiple: false,
  rest: null,
  getOptionValue: option => option.id,
  getOptionLabel: option => option.label,
};
