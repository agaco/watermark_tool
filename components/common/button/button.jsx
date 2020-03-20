import React from 'react';
import './button.scss';

const Button = props => (
    <button {...props} className="pt-button">
        {props.children}
    </button>
);

export default Button;
