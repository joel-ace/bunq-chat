import { createContext } from 'react';

import { initialState } from 'reducers/appReducer';

const AppContext = createContext(initialState);

export default AppContext;
