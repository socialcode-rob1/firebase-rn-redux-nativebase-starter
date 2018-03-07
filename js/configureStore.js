import { Platform } from 'react-native';
import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import devTools from 'remote-redux-devtools';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { reducer as formReducer } from 'redux-form';

import AuthReducer from './Auth/AuthReducer';
import IdeaReducer from './Ideas/IdeaReducer';

const RootReducer = combineReducers({
  auth: AuthReducer,
  idea: IdeaReducer,
  form: formReducer,
});

const middleware = applyMiddleware(thunk, promise, logger);

const Store = createStore(
  RootReducer,
  compose(
    middleware,
    devTools({
      name: Platform.OS,
      hostname: 'localhost',
      port: 5678,
    }),
  ),
);

export default Store;
