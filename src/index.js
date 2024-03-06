import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import ReactDOM from 'react-dom/client';
import App from './App';
import fieldReducer from "./reduser/fieldReduser";
import { thunk } from 'redux-thunk'

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(fieldReducer, applyMiddleware(thunk))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
