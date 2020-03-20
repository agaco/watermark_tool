import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import './input.scss';

const Input = props => {
    const {value, placeholder, onChange} = props;


    const [focus, setFocus] = useState(false);
    const hasValue = value.length !== 0;
    const onFocus = useCallback(() => {
        setFocus(true);
    }, []);

    const onBlur = useCallback(() => {
        setFocus(false);
    }, []);

    const doChange = useCallback(e => onChange(e.target.value), [onChange]);

    return (
        <div
            className={`pt-input ${focus ? 'pt-input--focus' : ''} ${
                hasValue ? 'pt-input--has-value' : ''
            }`}
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
};

export default Input;
