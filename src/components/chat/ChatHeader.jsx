import React from 'react';
import PropTypes from 'prop-types';

const ChatHeader = ({ conversation }) => (
  <div className="top flex-container-mobile">
    <h1>{conversation.name}</h1>
  </div>
);

ChatHeader.propTypes = {
  conversation: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default ChatHeader;
