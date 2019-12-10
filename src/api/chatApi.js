import axios from 'axios';

const BASE_URL = 'http://assignment.bunq.com';

const http = axios.create({
  baseURL: BASE_URL,
  timeout: 200000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const getAllUsers = async () => http.get('/users');

export const getUserById = async (id) => http.get(`/user/${id}`);

export const getUserConversations = async (id) => http.get(`/conversation/user/${id}`);

export const getConversationById = async (id) => http.get(`/conversation/${id}`);

export const getNewMessages = async (conversationId, lastMessageId) => http.get(`/conversation/${conversationId}/new/${lastMessageId}`);

export const getMessageByLimit = async (conversationId, offset, limit) => http.get(`/conversation/${conversationId}/message/limited`, {
  params: {
    limit,
    offset,
  }
});

export const getLastSeen = async (conversationId, userId) => http.get(`/conversation/${conversationId}/lastseen/${userId}`);

export const sendMessage = async (conversationid, senderId, message) => http.post(`/conversation/${conversationid}/message/send`, {
  message,
  senderId,
});

export const createPersonalConversation = async (users) => http.post('/conversation/personal', {
  users,
});

export const createNewGroup = async (users, name) => http.post('/conversation/group', {
  users,
  name,
});

export const updateLastSeen = async (conversationId, userId) => http.post(`/conversation/${conversationId}/seen/${userId}`);
