import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {applyMiddleware, createStore, compose} from 'redux';
import combineReducers from './Reducers';

const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

const store = createStore(
  combineReducers,
  compose(applyMiddleware(...middleware)),
);

const getStore = () => store;
const getState = () => store.getState();

export {getState, getStore};
