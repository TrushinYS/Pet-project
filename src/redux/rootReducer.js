import { FETCH_NEWS, NEWS_ID } from "./types"

const inititalState = {
	newsList: [],
	newsPost: []
}

export const rootReducer = (state = inititalState, action) => {
	switch(action.type) {
		case NEWS_ID:
			console.log({...state, newsList: action.payload})
			return {...state, newsList: action.payload};

		case FETCH_NEWS:
			console.log({...state, newsPost: [...state.newsPost, action.payload]})
			return {...state, newsPost: [...state.newsPost, action.payload]}

		default: return state
	}
}