//интерфейс для state
export interface AppState {
	page: boolean,
	comments: boolean,
	fetchError: boolean,
};

//типизация для экшенов
export enum AppActionTypes {
	SHOW_LOADER_PAGE = 'SHOW_LOADER_PAGE',
	HIDE_LOADER_PAGE = 'HIDE_LOADER_PAGE',

	SHOW_LOADER_COMMENTS = 'SHOW_LOADER_COMMENTS',
	HIDE_LOADER_COMMENTS = 'HIDE_LOADER_COMMENTS',

	FETCH_ERROR_MESSAGE = 'FETCH_ERROR_MESSAGE',
};

interface ShowLoaderPageAction {
	type: AppActionTypes.SHOW_LOADER_PAGE
};

interface HideLoaderPageAction {
	type: AppActionTypes.HIDE_LOADER_PAGE
};

interface ShowLoaderCommentsAction {
	type: AppActionTypes.SHOW_LOADER_COMMENTS
};

interface HideLoaderCommentsAction {
	type: AppActionTypes.HIDE_LOADER_COMMENTS
};

interface FetchErrorMessageAction {
	type: AppActionTypes.FETCH_ERROR_MESSAGE,
	payload: boolean
};

export type AppActions = (
	ShowLoaderPageAction 
	| HideLoaderPageAction 
	| ShowLoaderCommentsAction 
	| HideLoaderCommentsAction 
	| FetchErrorMessageAction
);



