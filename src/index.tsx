import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import '@Css/style.css';
import App from '@/App';
import { rootReducer } from '@Redux/reducers/rootReducer';

const store = createStore(rootReducer, composeWithDevTools(
	applyMiddleware(thunk)
));

const app = (
	<Provider store={store}>
		<App />
	</Provider>
);

render(app, document.getElementById('root'));

