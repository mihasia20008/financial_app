import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from '../reducers';

const loggerMiddleware = createLogger();

const store = createStore(
  reducers,
  applyMiddleware(
    thunk,
    loggerMiddleware
  )
);

export default store;
