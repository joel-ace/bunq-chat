import React, {
  useContext,
  useRef,
  useEffect,
  createRef
} from 'react';
import PropTypes from 'prop-types';

import AppContext from 'context';
import SendChatMessage from 'components/chat/SendChatMessage';
import SentMessage from 'components/chat/SentMessage';
import ReceivedMessage from 'components/chat/ReceivedMessage';
import { getLatestMessages, setCheckForMessage } from 'actions/chatActions';
import { isMessageSender, getLastMessage } from 'helpers/app';

const ConversationMessages = ({ displayConversation }) => {
  const { dispatch, state } = useContext(AppContext);
  const chatContainerRef = useRef();

  const { checkForMessage, auth: { user } } = state;
  const { messages } = displayConversation || {};
  const lastMessage = createRef();
  lastMessage.current = getLastMessage(messages);

  let interval = null;
  let count = 0;
  let pollSession = 0;
  let delay = 3000;

  const maxPollPerSession = 20;
  const maxPollSession = 3;

  const pollNewMessages = (timeDelay) => {
    if (interval) {
      return false;
    }
    interval = setInterval(() => makeApiCall(), timeDelay);
  };

  const stopPolling = () => {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  };

  const makeApiCall = async () => {
    const newMessages = await getLatestMessages(
      dispatch,
      displayConversation.conversationId,
      (lastMessage.current && lastMessage.current.id)
    );

    if (newMessages.latestMessage.length) {
      lastMessage.current = newMessages.latestMessage[0];
    }

    // if there's no new message after one minute, poll every 6 seconds
    if (count === maxPollPerSession) {
      count = 0;
      pollSession += 1;
      stopPolling();
      pollNewMessages(delay * 2);
    }

    // Stop polling after 15 minutes and show link to get new messages
    if (pollSession === maxPollSession) {
      count = 0;
      setCheckForMessage(dispatch, true);
      stopPolling();
    }

    if (!newMessages.latestMessage.length) {
      count += 1;
      return false;
    }

    count = 0;
    delay = 3000;
  };

  const loadNewMessages = () => {
    setCheckForMessage(dispatch, false);
    pollNewMessages(delay);
  };

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  });

  useEffect(() => {
    lastMessage.current = getLastMessage(messages);
    pollNewMessages(delay);
    return stopPolling;
  }, [messages]);

  return (
    <div className="messaging-container">
      <div className="conversations" ref={chatContainerRef}>
        {
          messages && messages.map((message) => {
            if (message.message) {
              return isMessageSender(user, message)
                ? <SentMessage key={`snt-${message.id}`} message={message} />
                : <ReceivedMessage key={`recv-${message.id}`} message={message} />;
            }
            return false;
          })
        }
        <div
          role="button"
          className="new-msgs-tag"
          onClick={loadNewMessages}
        >
          {checkForMessage && <span>Check for new messages</span>}
        </div>
      </div>
      <SendChatMessage conversation={displayConversation} user={user} />
    </div>
  );
};

ConversationMessages.propTypes = {
  displayConversation: PropTypes.shape({
    conversationId: PropTypes.string,
  }).isRequired,
};

export default ConversationMessages;
