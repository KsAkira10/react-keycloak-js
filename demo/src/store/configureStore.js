import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic, rootReducer } from './ducks';
import { ReduxCompose } from '../shared/utils';

const epicMiddleware = createEpicMiddleware();

const composeEnhancers = ReduxCompose() || compose;

const configureStore = () => {
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(epicMiddleware)));
  epicMiddleware.run(rootEpic);
  return store;
};

export default configureStore;
