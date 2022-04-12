import { combineReducers } from 'redux';
import { appReducer } from '@Redux/reducers/appReducer';
import { newsReducer } from '@Redux/reducers/newsReducer';

export const rootReducer = combineReducers({
	news: newsReducer,
	app: appReducer
});