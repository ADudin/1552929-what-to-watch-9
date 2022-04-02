import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import App from './components/app/app';
import ErrorMessage from './components/error-message/error-message';
import {store} from './store/store';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';

import {
  fetchFilmsAction,
  checkAuthAction
} from './store/api-actions';

store.dispatch(fetchFilmsAction());
store.dispatch(checkAuthAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ErrorMessage />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
