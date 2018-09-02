import * as React from 'react';
import { render } from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './reducer';

import PhotoFinderApp from './App';

import './index.css';

const store = createStore(reducer);

render(
  <Provider store={store}>
    <PhotoFinderApp />
  </Provider>,
  document.getElementById('root'));
