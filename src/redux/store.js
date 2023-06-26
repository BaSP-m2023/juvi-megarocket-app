import { combineReducers, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { SuperAdminsReducer } from 'redux/superadmins/reducer';
import trainersReducer from 'redux/trainers/reducer';
import { adminsReducer } from 'redux/admins/reducer';
import { activitiesReducer } from 'redux/activities/reducer';
import { membersReducer } from 'redux/members/reducer';
import { classesReducer } from 'redux/classes/reducer';
import { subscriptionsReducer } from 'redux/subscriptions/reducer';
import { authReducer } from 'redux/auth/reducer';

const rootReducer = combineReducers({
  trainers: trainersReducer,
  admins: adminsReducer,
  members: membersReducer,
  classes: classesReducer,
  activities: activitiesReducer,
  subscriptions: subscriptionsReducer,
  superAdmins: SuperAdminsReducer,
  auth: authReducer
});

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;
