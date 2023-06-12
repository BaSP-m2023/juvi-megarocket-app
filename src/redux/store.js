import { combineReducers, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { adminsReducer } from './admins/reducer';
import { activitiesReducer } from './activities/reducer';

const rootReducer = combineReducers({
  admins: adminsReducer,
  activities: activitiesReducer
import { membersReducer } from './members/reducer';
import { classesReducer } from './classes/reducer';

const rootReducer = combineReducers({
  admins: adminsReducer,
  members: membersReducer,
  classes: classesReducer
});

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;
