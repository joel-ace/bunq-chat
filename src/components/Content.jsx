import React, { useContext } from 'react';

import AppContext from 'context';
import ChatHeader from 'components/chat/ChatHeader';
import SideBar from 'components/chat/SideBar';
import ConversationMessages from 'components/chat/ConversationMessages';

const Content = () => {
  const { state } = useContext(AppContext);
  const { chat: { displayConversation } } = state;

  return (
    <div className="row flex-container">
      <SideBar />
      <section className="content-area">
        <div className="content">
          { displayConversation && <ChatHeader conversation={displayConversation} /> }
          <div className="main-content flex-container">
            { displayConversation && <ConversationMessages displayConversation={displayConversation} /> }
          </div>
        </div>
      </section>
    </div>
  );
};

export default Content;
