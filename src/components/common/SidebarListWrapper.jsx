import React from 'react';
import PropTypes from 'prop-types';

const SidebarListWrapper = ({ children }) => (
  <div className="conversation-container">
    <ul className="conversation-list">
      { children }
    </ul>
  </div>
);

SidebarListWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array
  ]),
};

SidebarListWrapper.defaultProps = {
  children: null,
};


export default SidebarListWrapper;
