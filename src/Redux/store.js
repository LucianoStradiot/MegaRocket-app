import { combineReducers, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { adminsReducer } from './Admins/reducer';
import { trainersReducer } from './Trainers/reducer';
import { superAdminsReducer } from './SuperAdmins/reducer';
import { membersReducer } from './Members/reducer';
import { subscriptionsReducer } from './Subscriptions/reducer';
import { classesReducer } from './Classes/reducer';
import { activitiesReducer } from './Classes/reducer';

const rootReducer = combineReducers({
  admins: adminsReducer,
  superAdmins: superAdminsReducer,
  trainers: trainersReducer,
  members: membersReducer,
  subscriptions: subscriptionsReducer,
  classes: classesReducer,
  activities: activitiesReducer
});

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;
