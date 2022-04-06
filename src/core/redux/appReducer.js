import { SHOW_LOADER_PAGE, 
	HIDE_LOADER_PAGE, 
	SHOW_LOADER_COMMENTS, 
	HIDE_LOADER_COMMENTS,
	FETCH_ERROR_MESSAGE } from "./types";

const inititalState = {
	page: false,
	comments: false,
	fetchError: false
};

export const appReducer = (state = inititalState, action) => {
	switch(action.type) {
		case SHOW_LOADER_PAGE:
			return {...state, page: true};
		case HIDE_LOADER_PAGE:
			return {...state, page: false};
		case SHOW_LOADER_COMMENTS:
			return {...state, comments: true};
		case HIDE_LOADER_COMMENTS:
			return {...state, comments: false};
		case FETCH_ERROR_MESSAGE:
			return {...state, fetchError: action.payload};
		default: return state
	}
}