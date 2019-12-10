import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUser } from 'helpers/app';

const ReceivedMessage = ({ message }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const chatUser = await getUser(message.senderId);
      setUser(chatUser);
    };
    fetchUser();
    return () => {
      setUser(null);
    };
  }, []);

  return (
    <div className="conversation-part">
      <div className="message-received pull-left">
        <div className="chat">
          <div className="msg">
            <div className="message rcv">{message.message}</div>
            <p className="date">
              {user && `${user.name} at `}
              {message.timestamp}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

ReceivedMessage.propTypes = {
  message: PropTypes.shape({
    message: PropTypes.string,
    timestamp: PropTypes.string,
    senderId: PropTypes.string,
  }).isRequired,
};

export default ReceivedMessage;
