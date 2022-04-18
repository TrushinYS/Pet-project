import { NewsActions, 
	NewsActionTypes, 
	NewsState } from '@Redux/types/newsTypes';

const inititalState: NewsState = {
	newsList: [],
	newsItem: {
		by: '',
		descendants: 0,
		id: 0,
		score: 0,
		time: '',
		title: '',
		type: '',
		url: '',
	},
};

export const newsReducer = (state = inititalState, action:NewsActions):NewsState => {
	switch(action.type) {
		case NewsActionTypes.NEWS_LIST:
			return {...state, newsList: action.payload};

		case NewsActionTypes.NEWS_ITEM:
			return {...state, newsItem: action.payload}

		default: return state
	}
};