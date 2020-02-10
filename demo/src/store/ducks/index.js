import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
// example - delete later
import { exampleEpic, exampleReducers } from './example';

export const rootEpic = combineEpics(
  // example - delete later
  exampleEpic
);
export const rootReducer = combineReducers({
  // example - delete later
  ...exampleReducers
});