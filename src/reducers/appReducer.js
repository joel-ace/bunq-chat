export const initialState = {
  auth: {
    isLoggedIn: false,
    user: {},
    loading: true,
    error: false,
},
  chat: {
    conversations: null,
    displayConversation: null,
  },
  users: null,
  displaySidebarComponent: 'conversations',
  groupChatSelectedUsers: {},
  checkForMessage: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_USER_REQUEST':
      return {
        ...state,
        auth: {
          ...initialState.auth,
          loading: true,
          error: false,
        }
      };
    case 'LOGIN_USER_SUCCESS':
      return {
        ...state,
        auth: {
          ...initialState.auth,
          isLoggedIn: true,
          user: action.payload,
          loading: false,
          error: false,
        }
      };
    case 'LOGIN_USER_FAIL':
      return {
        ...state,
        auth: {
          ...initialState.auth,
          loading: false,
          error: action.payload,
        }
      };
    case 'CHECK_AUTH_STATUS_SUCCESS':
      return {
        ...state,
        auth: {
          user: action.payload,
          isLoggedIn: true,
        }
      };
    case 'CHECK_AUTH_STATUS_FAIL':
      return {
        ...state,
        auth: {
          user: {},
          isLoggedIn: false,
        }
      };
    case 'LOGOUT_USER':
      return {
        ...initialState,
      };
    case 'GET_CONVERSATIONS':
      return {
        ...state,
        chat: {
          ...state.chat,
          conversations: action.payload,
        }
      };
    case 'GET_CONVERSATIONS_FAIL':
      return {
        ...state,
        chat: {
          ...initialState.chat,
        }
      };
    case 'SET_DISPLAY_CONVERVATION_ID':
      return {
        ...state,
        chat: {
          ...state.chat,
          displayConversation: action.payload,
        }
      };
    case 'SELECT_GROUP_CHAT_USERS':
      return {
        ...state,
        groupChatSelectedUsers: {
          ...state.groupChatSelectedUsers,
          [action.payload]: true,
        }
      };
    case 'UNSELECT_GROUP_CHAT_USER': {
      const newSelection = delete state.groupChatSelectedUsers[action.payload];
      return {
        ...state,
        groupChatSelectedUsers: {
          ...state.groupChatSelectedUsers,
          ...newSelection,
        }
      };
    }
    case 'SET_DISPLAY_SIDEBAR_COMPONENT':
      return {
        ...state,
        displaySidebarComponent: action.payload,
      };
    case 'GET_CHAT_MESSAGES':
      return {
        ...state,
        chat: {
          ...state.chat,
          displayConversation: {
            ...state.chat.displayConversation,
            messages: action.payload,
          }
        }
      };
    case 'CREATE_CONVERSATION_SUCCESS':
      return {
        ...state,
        chat: {
          ...state.chat,
          conversations: [
            action.payload,
            ...state.chat.conversations,
          ],
        }
      };
    case 'GET_ALL_USERS_SUCCESS':
      return {
        ...state,
        users: action.payload,
      };
    case 'CLEAR_SELECT_USER':
      return {
        ...state,
        groupChatSelectedUsers: {},
      };
    case 'GET_NEW_CHAT_SUCCESS': {
      return {
        ...state,
        chat: {
          ...state.chat,
          displayConversation: {
            ...state.chat.displayConversation,
            messages: [...state.chat.displayConversation.messages, ...action.payload]
          }
        }
      };
    }
    case 'SET_CHECK_FOR_MESSAGE': {
      return {
        ...state,
        checkForMessage: action.payload
      };
    }
    default:
      return state;
  }
};
