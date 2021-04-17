import { createStore, applyMiddleware, compose } from 'redux';
import { client } from '@tutoring/commons/middlewares';
import rootReducer from 'reducers';
import authMiddleware from 'store/authMiddleware';

const configureStore = (preloadedState) => {
  // Build the middleware for intercepting and dispatching navigation actions
  const middlewares = [
    client,
    authMiddleware,
  ];

  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?.({ trace: true, traceLimit: 25 }) || compose;
  const customComposer = (process.env.REACT_APP_ENV === 'prod') ? compose : composeEnhancers;
  const store = createStore(
    rootReducer,
    preloadedState,
    customComposer(
      applyMiddleware(...middlewares),
    ),
  );

  return store;
};

export default configureStore;
