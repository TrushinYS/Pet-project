import { AppActions, 
	AppActionTypes, 
	AppState } from '@Redux/types/appTypes';

const inititalState: AppState = {
	page: false,
	comments: false,
	fetchError: false
};

export const appReducer = (state = inititalState, action: AppActions):AppState => {
	switch(action.type) {
		case AppActionTypes.SHOW_LOADER_PAGE:
			return {...state, page: true};
		case AppActionTypes.HIDE_LOADER_PAGE:
			return {...state, page: false};
		case AppActionTypes.SHOW_LOADER_COMMENTS:
			return {...state, comments: true};
		case AppActionTypes.HIDE_LOADER_COMMENTS:
			return {...state, comments: false};
		case AppActionTypes.FETCH_ERROR_MESSAGE:
			return {...state, fetchError: action.payload};
		default: return state
	}
};