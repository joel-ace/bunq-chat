import {
  getAllUsers,
  getUserConversations,
  getConversationById,
  getNewMessages,
  getMessageByLimit,
  getLastSeen,
  sendMessage,
  createPersonalConversation,
  createNewGroup,
  updateLastSeen,
} from 'api/chatApi';

import {
  GET_CONVERSATIONS,
  GET_CONVERSATIONS_FAIL,
  GET_CHAT_MESSAGES,
  GET_CHAT_MESSAGES_FAIL,
  SET_DISPLAY_CONVERVATION_ID,
  SET_DISPLAY_SIDEBAR_COMPONENT,
  SELECT_GROUP_CHAT_USERS,
  UNSELECT_GROUP_CHAT_USER,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
  CREATE_CONVERSATION_SUCCESS,
  CREATE_GROUP_CONVERSATION_FAIL,
  CREATE_PERSONAL_CONVERSATION_FAIL,
  CLEAR_SELECT_USER,
  SET_CHECK_FOR_MESSAGE,
  GET_NEW_CHAT_SUCCESS,
  SEND_CHAT_FAIL,
} from 'src/constants';


import {
  loadDataInLocalStorage,
  convertUserArrayToObject
} from 'helpers/app';

export const getConversations = async (dispatch, userId) => {
  // a data cache layer (redis) is supposed to be used here instead of localstorage
  if (loadDataInLocalStorage().conversations) {
    dispatch({
      type: GET_CONVERSATIONS,
      payload: loadDataInLocalStorage().conversations,
    });
  }
  try {
    const conversations = await getUserConversations(userId);
    if (conversations) {
      localStorage.setItem('bunqChatConversations', JSON.stringify(conversations.data.reverse()));
      dispatch({
        type: GET_CONVERSATIONS,
        payload: loadDataInLocalStorage().conversations,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_CONVERSATIONS_FAIL,
    });
  }
};

export const getChatMessages = async (dispatch, conversationId, offset = 0, limit = 20) => {
  try {
    const chatMessages = await getMessageByLimit(conversationId, offset, limit);
    if (chatMessages) {
      dispatch({
        type: GET_CHAT_MESSAGES,
        payload: chatMessages.data.reverse(),
      });
    }
  } catch (error) {
    dispatch({
      type: GET_CHAT_MESSAGES_FAIL,
    });
  }
};

export const setDisplayConversation = (dispatch, conversation) => {
  setCheckForMessage(dispatch, false);
  dispatch({
    type: SET_DISPLAY_CONVERVATION_ID,
    payload: conversation,
  });
};

export const setDisplaySidebarComponent = (dispatch, component) => {
  dispatch({
    type: SET_DISPLAY_SIDEBAR_COMPONENT,
    payload: component,
  });
};

export const selectGroupChatUsers = (dispatch, userId) => {
  dispatch({
    type: SELECT_GROUP_CHAT_USERS,
    payload: userId,
  });
};

export const unSelectGroupChatUser = (dispatch, userId) => {
  dispatch({
    type: UNSELECT_GROUP_CHAT_USER,
    payload: userId,
  });
};

export const getChatUsers = async (dispatch) => {
  try {
    const users = await getAllUsers();
    if (users.data.length) {
      return dispatch({
        type: GET_ALL_USERS_SUCCESS,
        payload: users.data,
      });
    }
    const usersObject = convertUserArrayToObject(users.data);
    // this should ideally be done on redis
    localStorage.setItem('bunqChatUsers', JSON.stringify(usersObject));
  } catch (error) {
    dispatch({
      type: GET_ALL_USERS_FAIL,
      payload: 'Something Went wrong. Please try again later',
    });
  }
};

export const createGroupConversation = async (dispatch, groupDetails) => {
  try {
    const groupConversation = await createNewGroup(groupDetails.users, groupDetails.name);
    const conversationDetails = await getConversationById(groupConversation.data.id);

    if (conversationDetails.data) {
      dispatch({
        type: CREATE_CONVERSATION_SUCCESS,
        payload: conversationDetails.data,
      });
      setDisplaySidebarComponent(dispatch, 'conversations');
      setDisplayConversation(dispatch, conversationDetails.data.conversation);
    }
  } catch (error) {
    dispatch({
      type: CREATE_GROUP_CONVERSATION_FAIL,
      payload: error,
    });
  }
};

export const createPersonalChat = async (dispatch, users) => {
  try {
    const personalConversation = await createPersonalConversation(users);
    const conversationDetails = await getConversationById(personalConversation.data.id);

    if (conversationDetails.data) {
      dispatch({
        type: CREATE_CONVERSATION_SUCCESS,
        payload: conversationDetails.data,
      });
      setDisplaySidebarComponent(dispatch, 'conversations');
      setDisplayConversation(dispatch, conversationDetails.data.conversation);
    }
  } catch (error) {
    dispatch({
      type: CREATE_PERSONAL_CONVERSATION_FAIL,
      payload: error,
    });
  }
};

export const clearSelectedGroupUsers = (dispatch) => {
  dispatch({
    type: CLEAR_SELECT_USER,
  });
};

export const setCheckForMessage = (dispatch, value) => {
  dispatch({
    type: SET_CHECK_FOR_MESSAGE,
    payload: value,
  });
};

export const getLatestMessages = async (dispatch, conversationId, lastMessageId) => {
  if (!conversationId || !lastMessageId) {
    return {
      latestMessage: [],
    };
  }

  try {
    const newMessages = await getNewMessages(conversationId, lastMessageId);
    if (newMessages.data.length) {
      dispatch({
        type: GET_NEW_CHAT_SUCCESS,
        payload: newMessages.data,
      });
      setCheckForMessage(dispatch, false);
      return {
        latestMessage: newMessages.data,
      };
    }
  } catch (error) {
    return {
      latestMessage: [],
    };
  }
};

export const sendChatMessage = async (dispatch, conversationid, senderId, message) => {
  setCheckForMessage(dispatch, false);
  try {
    await sendMessage(conversationid, senderId, message);
    return {
      clearTextArea: true,
    };
  } catch (error) {
    dispatch({
      type: SEND_CHAT_FAIL,
    });
    return {
      clearTextArea: false,
    };
  }
};
