import { NEWS_ITEM, NEWS_ITEM_COMMENTS, NEWS_LIST } from "./types"

const inititalState = {
	newsList: [],
	newsItem: {},
	newsItemComments: {}
}

export const newsReducer = (state = inititalState, action) => {
	switch(action.type) {
		case NEWS_LIST:
			console.log({newsList: action.payload})
			return {...state, newsList: action.payload};

		case NEWS_ITEM:
			console.log({newsItem: action.payload})
			return {...state, newsItem: action.payload}
		
		case NEWS_ITEM_COMMENTS:
			console.log({newsItemComments: action.payload})
			return {...state, newsItemComments: action.payload}

		default: return state
	}
}