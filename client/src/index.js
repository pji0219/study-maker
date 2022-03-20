import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App';
import Auth from './auth/Auth';
import rootReducer, { rootSaga } from './redux-modules';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

/* 
  사이트 접속시 처음에 로그인 창이 뜨게 하고 로그인 시에 홈페이지로 가기위해
  Auth 컴포넌트로 App 컴포넌트를 감싸줌 * Auth 컴포넌트 참고 *
*/
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth>
        <App />
      </Auth>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
