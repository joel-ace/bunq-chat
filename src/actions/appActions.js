import { getAllUsers } from 'api/chatApi';
import { isValidUser } from 'helpers/app';

import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGOUT_USER,
} from 'src/constants';

export const loginUser = async (dispatch, input) => {
  dispatch({
    type: LOGIN_USER_REQUEST,
  });

  try {
    const users = await getAllUsers(input.username);
    const validUser = isValidUser(users.data, input.username);
    if (validUser.length) {
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: validUser[0],
      });
      return localStorage.setItem('bunqChatId', JSON.stringify(validUser[0]));
    }
    return dispatch({
      type: LOGIN_USER_FAIL,
      payload: 'User not found',
    });
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: 'An error occured',
    });
  }
};

export const isLoggedIn = (dispatch, state) => {
  const user = localStorage.getItem('bunqChatId');
  const { auth } = state;

  if (user && !auth.user.id) {
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: JSON.parse(user),
    });
    return true;
  }
  dispatch({
    type: LOGIN_USER_FAIL,
  });
  return false;
};


export const logout = (dispatch) => {
  localStorage.removeItem('bunqChatId');
  localStorage.removeItem('bunqChatConversations');
  localStorage.removeItem('bunqChatUsers');
  dispatch({
    type: LOGOUT_USER,
  });
};
