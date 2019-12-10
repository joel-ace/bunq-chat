import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React, { useReducer, useEffect, useContext } from 'react';

import AppContext from 'context';
import appReducer from 'reducers/appReducer';
import { isLoggedIn } from 'actions/appActions';

import Content from 'components/Content';
import Login from 'components/Login';

import '../scss/main.scss';

const App = () => {
  const defaultState = useContext(AppContext);
  const [state, dispatch] = useReducer(appReducer, defaultState);

  useEffect(() => {
    if (!state.auth.isLoggedIn) {
      isLoggedIn(dispatch, state);
    }
  }, [state.auth.isLoggedIn]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      { state.auth.isLoggedIn ? <Content /> : <Login /> }
    </AppContext.Provider>
  );
};

export default App;
