import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools, devToolsEnhancer } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
//import './main-page.css';
import App from './App';
import { rootReducer } from './redux/rootReducer';

const store = createStore(rootReducer, compose(
	applyMiddleware(thunk)
));

const app = (
	<Provider store={store}>
		<App />
	</Provider>
);

render(app, document.getElementById('root'));

