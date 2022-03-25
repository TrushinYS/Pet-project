import { FETCH_NEWS, FETCH_NEWS_LIST } from "./types"

const inititalState = {
	newsList: [],
	newsPost: []
}

export const rootReducer = (state = inititalState, action) => {
	switch(action.type) {
		case FETCH_NEWS_LIST:
			return {...state, newsList: action.payload}

		case FETCH_NEWS:
			return {...state, newsPost: action.payload}

		default: return state
	}
}