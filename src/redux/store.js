import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk)),
);

const logger = () => {
  /* eslint-disable no-console */
  console.log('STORE:', store.getState());
};

store.subscribe(logger);
logger();

export default store;
