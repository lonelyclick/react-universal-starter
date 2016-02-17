import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose } from 'redux';

import {
  ReduxRouter,
  reduxReactRouter,
} from 'redux-router';

import { Provider } from 'react-redux';
import createHistory from 'history/lib/createBrowserHistory';

import routes from './routes';
import reducer from './reducer';
import { MOUNT_ID } from './constants';

const store = compose(
  reduxReactRouter({ createHistory })
)(createStore)(reducer, window.__initialState);

const rootComponent = (
  <Provider store={store}>
    <ReduxRouter routes={routes} />
  </Provider>
);

ReactDOM.render(rootComponent, document.getElementById(MOUNT_ID))
