import { NEWS_ITEM, NEWS_LIST } from "./types"

const inititalState = {
	newsList: [],
	newsItem: [],
}

export const newsReducer = (state = inititalState, action) => {
	switch(action.type) {
		case NEWS_LIST:
			console.log({newsList: action.payload})
			return {...state, newsList: action.payload};

		case NEWS_ITEM:
			console.log({newsItem: action.payload})
			return {...state, newsItem: action.payload}

		default: return state
	}
}