import { getUserById } from 'api/chatApi';

export const isValidUser = (users, name) => users.filter(
  (user) => user.name.toLowerCase() === name.toLowerCase()
);

export const isLoggedIn = () => localStorage.getItem('bunqChat');

export const isMessageSender = (user, message) => Number(user.id) === Number(message.senderId);

export const isActiveConversation = (displayCoversationId, conversationId) => displayCoversationId === conversationId;

export const serializeObjKeysToString = (object) => {
  const objectToArray = Object.keys(object).map((key) => key);
  return objectToArray.join(',');
};

export const getLastMessage = (messages) => {
  if (!messages) {
    return {};
  }

  return messages[messages.length - 1];
};

export const convertUserArrayToObject = (userArray) => {
  const userObj = {};
  userArray.forEach((user) => {
    userObj[user.id] = user;
  });
  return userObj;
};

export const loadDataInLocalStorage = () => ({
  conversations: JSON.parse(localStorage.getItem('bunqChatConversations')),
  users: JSON.parse(localStorage.getItem('bunqChatUsers')),
});


export const getUser = async (userId) => {
  const { users } = loadDataInLocalStorage();

  if (users && users[userId]) {
    return users[userId];
  }

  const chatUser = await getUserById(userId);
  if (chatUser.data) {
    return chatUser.data;
  }

  return false;
};
