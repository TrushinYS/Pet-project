import { NewsActions, NewsActionTypes, NewsState } from "../types/Newstypes"

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
}

export const newsReducer = (state = inititalState, action:NewsActions):NewsState => {
	switch(action.type) {
		case NewsActionTypes.NEWS_LIST:
			console.log({newsList: action.payload})
			return {...state, newsList: action.payload};

		case NewsActionTypes.NEWS_ITEM:
			console.log({newsItem: action.payload})
			return {...state, newsItem: action.payload}

		default: return state
	}
}