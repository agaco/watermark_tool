import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import './input.scss';

const Input = ({value, placeholder, onChange}) => {


  const [focus, setFocus] = useState(false);
  const hasValue = value.length !== 0;
  const onFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const onBlur = useCallback(() => {
    setFocus(false);
  }, []);

  const doChange = useCallback((e) => onChange(e.target.value), [onChange]);

  const isFocused = `pt-input ${focus ? 'pt-input--focus' : ''}`;
  const isEmptyValue = `${hasValue ? 'pt-input--has-value' : ''}`;
  return (
    <div className={`${isFocused} ${isEmptyValue}`}
    >
      <input
        className="pt-input__input"
        value={value}
        onChange={doChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {placeholder && (
        <span className="pt-input__placeholder">{placeholder}</span>
      )}
    </div>
  );
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
