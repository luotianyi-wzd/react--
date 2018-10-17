import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux'
import configureStore from './redux/store'
import MyRouter from './router'
import * as serviceWorker from './serviceWorker';
const store = configureStore()
ReactDOM.render(
	<Provider store={store}>
		<MyRouter />
	</Provider>, 
	document.getElementById('root'));
serviceWorker.unregister();
