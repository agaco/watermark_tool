import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

const Button = (props) => (
  <button {...props} className='pt-button'>
    {props.children}
  </button>
);

Button.propTypes = {
  props: PropTypes.any.isRequired,
};

export default Button;
