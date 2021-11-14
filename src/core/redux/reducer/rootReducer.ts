import { combineReducers } from 'redux';
import authReducer from './authReducer';
import boardReducer from './boardReducer';
import cardReducer from './cardReducer';
import userReducer from './userReducer';

export const rootReducer = combineReducers({
  board: boardReducer,
  user: userReducer,
  auth: authReducer,
  card: cardReducer
});

export type RootState = ReturnType<typeof rootReducer>;
