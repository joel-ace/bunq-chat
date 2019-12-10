import React from 'react';
import PropTypes from 'prop-types';

const SidebarButton = ({
  icon,
  onClick,
  title,
  type,
  buttonClass,
  disabled
}) => (
  // eslint-disable-next-line react/button-has-type
  <button
    disabled={disabled}
    className={buttonClass || 'btn btn-info'}
    type={type}
    onClick={onClick}
  >
    { icon && <i className={icon} /> }
    { title && ` ${title}`}
  </button>
);

SidebarButton.propTypes = {
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string,
  type: PropTypes.string,
  buttonClass: PropTypes.string,
};

SidebarButton.defaultProps = {
  disabled: false,
  icon: '',
  type: 'button',
  buttonClass: '',
  title: '',
};


export default SidebarButton;
