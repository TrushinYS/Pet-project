import { HIDE_LOADER, SHOW_LOADER } from "./types";

const inititalState = false;

export const appReducer = (state = inititalState, action) => {
	switch(action.type) {
		case SHOW_LOADER:
			return state = true;
		case HIDE_LOADER:
			return state = false;
		default: return state
	}
}