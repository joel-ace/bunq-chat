import React from 'react';
import PropTypes from 'prop-types';

const SidebarListItem = ({
  className,
  onClick,
  leftElement,
  name,
  subInfo
}) => (
  <li className={className} onClick={onClick}>
    <div className="conversation flex-container-mobile">
      { leftElement }
      <div className="conversation-details">
        <p className="conversation-title">{name}</p>
        <p>{subInfo}</p>
      </div>
    </div>
  </li>
);

SidebarListItem.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  leftElement: PropTypes.element.isRequired,
  name: PropTypes.string,
  subInfo: PropTypes.string,
};

SidebarListItem.defaultProps = {
  className: '',
  subInfo: '',
  name: '',
};

export default SidebarListItem;
