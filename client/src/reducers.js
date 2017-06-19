import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from 'containers/Signin/reducer';
import usersReducer from 'containers/UserList/reducer';
import chatsReducer from 'containers/Message/reducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  users: usersReducer,
  chats: chatsReducer
});

export default rootReducer;
