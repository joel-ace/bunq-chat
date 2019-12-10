import React from 'react';
import PropTypes from 'prop-types';

const SentMessage = ({ message }) => (
  <div className="conversation-part">
    <div className="message-sent pull-right">
      <div className="chat">
        <div className="msg">
          <div className="message snd">{message.message}</div>
          <p className="date">{message.timestamp}</p>
        </div>
      </div>
    </div>
  </div>
);

SentMessage.propTypes = {
  message: PropTypes.shape({
    message: PropTypes.string,
    timestamp: PropTypes.string,
  }).isRequired,
};

export default SentMessage;
