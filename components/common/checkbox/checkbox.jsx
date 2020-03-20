import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import './input.scss';

const Checkbox = ({placeholder, isChecked, onChange}) => {
  const doChange = useCallback((e) => onChange(), [onChange]);
  return (
    <div className='pt-checkbox'>
      <input
        type='checkbox'
        id='watermark'
        name='watermark'
        checked={isChecked}
        onChange={doChange}
        className='pt-checkbox__input'
      />
      {placeholder && (
        <label className={`pt-checkbox__placeholder ${isChecked && 'checked'}`}>
          {placeholder}
        </label>
      )}
    </div>
  );
};

Checkbox.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
