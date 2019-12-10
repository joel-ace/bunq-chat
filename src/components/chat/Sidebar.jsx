/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useEffect } from 'react';

import AppContext from 'context';
import SidebarTop from 'components/chat/SidebarTop';
import ChatConversations from 'components/chat/ChatConversations';
import ChatUsers from 'components/chat/ChatUsers';
import GroupNameInput from 'components/chat/GroupNameInput';
import { SIDEBAR_DISPLAY_OPTIONS } from 'src/constants';

import { logout } from 'actions/appActions';
import {
  getConversations,
  setDisplayConversation,
  getChatMessages,
  getChatUsers
} from 'actions/chatActions';

const Sidebar = () => {
  const { dispatch, state } = useContext(AppContext);
  const {
    auth: { user },
    chat: {
      conversations,
      displayConversation
    },
    users,
    displaySidebarComponent,
    groupChatSelectedUsers,
  } = state;

  useEffect(() => {
    getConversations(dispatch, user.id);
    getChatUsers(dispatch);
  }, []);

  useEffect(() => {
    console.log('sidebar use effect');
    if (conversations && !displayConversation) {
      setDisplayConversation(dispatch, conversations[0].conversation);
      getChatMessages(dispatch, conversations[0].conversation.conversationId);
    }
  }, [conversations]);

  return (
    <aside className="sidebar flex-container">
      <div className="upper-div">
        <SidebarTop />
        {
          Object.keys(
            displaySidebarComponent !== SIDEBAR_DISPLAY_OPTIONS.conversations
              && groupChatSelectedUsers
          ).length > 1 && <GroupNameInput />
        }
        {
          displaySidebarComponent === SIDEBAR_DISPLAY_OPTIONS.conversations
            ? <ChatConversations conversations={conversations} />
            : <ChatUsers users={users} />
        }
      </div>
      <div className="lower-div">
        <ul className="bottom-nav">
          <li>
            <div role="button" onClick={() => logout(dispatch)}>
              <i className="fa fa-sign-out" />
              <div>
                <p className="nav-title">Log out</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
