import { combineReducers } from 'redux';
import authReducer from './authReducer';
import boardReducer from './boardReducer';
import userReducer from './userReducer';

export const rootReducer = combineReducers({
  board: boardReducer,
  user: userReducer,
  auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;
