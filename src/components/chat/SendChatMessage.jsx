import React, { useState, useContext, useRef } from 'react';
import PropTypes from 'prop-types';

import AppContext from 'context';
import { sendChatMessage, getLatestMessages } from 'actions/chatActions';
import { getLastMessage } from 'helpers/app';

const SendChatMessage = ({ conversation, user }) => {
  const { dispatch } = useContext(AppContext);
  const [chatMessage, setChatMessage] = useState({});
  const textArea = useRef();

  const handleChange = (event) => {
    event.persist();
    setChatMessage(
      () => ({ ...chatMessage, [event.target.name]: event.target.value })
    );
  };

  const handleClick = async (event) => {
    event.preventDefault();
    const sendMessage = await sendChatMessage(
      dispatch,
      conversation.conversationId,
      user.id, chatMessage.message
    );

    if (sendMessage.clearTextArea) {
      const chatMsg = conversation.messages && getLastMessage(conversation.messages);
      await getLatestMessages(
        dispatch,
        conversation.conversationId,
        ((chatMsg && chatMsg.id) || 1),
      );

      textArea.current.value = '';
      textArea.current.focus();
      setChatMessage({});
    }
  };

  return (
    <div className="send-message">
      <form action="">
        <div className="form-group">
          <textarea
            ref={textArea}
            className="form-control"
            rows="5"
            name="message"
            id="comment"
            placeholder="type your message"
            onChange={handleChange}
          >
            {chatMessage.message}
          </textarea>
          <div className="txt-editor flex-container-mobile">
            <div className="editor-actions" />
            <button
              disabled={!chatMessage.message}
              className="btn btn-info"
              type="button"
              onClick={handleClick}
            >
              Message
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

SendChatMessage.propTypes = {
  conversation: PropTypes.shape({
    conversationId: PropTypes.string,
    messages: PropTypes.array,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
};

export default SendChatMessage;
