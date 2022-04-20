import { Dispatch } from 'redux';
import { AppActions, AppActionTypes } from '@Redux/types/appTypes';
import { ILittleNewsItemCardWithConvDate, 
	NewsActions, 
	NewsActionTypes, 
	NewsID, 
	IFullNewsItem, 
	ILittleNewsItemCard,
	INormalNewsItemComment,
	INormalNewsItemCommentWithConvDate,
	IFullNewsItemComment,
	TypesOfComments} from '@Redux/types/newsTypes';
import { onConvertDate } from '@Shared/helpers';
import Api from '@Shared/api';

//общая функция для загрузки новостей
async function onFetchNewsList(): Promise<ILittleNewsItemCardWithConvDate[]> {
	const newsListID = await Api.onFetchNewsListID();
	const newsList = await Api.onFetchNewsList(newsListID);
	const newsListWithConvDate = newsList.map(item => onConvertDate<ILittleNewsItemCard, ILittleNewsItemCardWithConvDate>(item));
	return newsListWithConvDate
};

//первичная/принудительная(по клику на кнопку) загрузка новостей
export function onLoadNewsList() {
	return async (dispatch: Dispatch<AppActions | NewsActions>) => {
		dispatch({
			type: AppActionTypes.SHOW_LOADER_PAGE,
		});
		dispatch({
			type: AppActionTypes.FETCH_ERROR_MESSAGE,
			payload: false,
		});
		
		try {
			const newsList = await onFetchNewsList();
			dispatch({
				type: NewsActionTypes.NEWS_LIST,
				payload: newsList
			});

		} catch(e) {
			dispatch({
				type: AppActionTypes.FETCH_ERROR_MESSAGE,
				payload: true,
			});

		} finally {
			dispatch({
				type: AppActionTypes.HIDE_LOADER_PAGE
			});
		}
	}
};

//автоматическое обновление новостей
export function autoUpdateNewsList() {
	return async (dispatch: Dispatch<AppActions | NewsActions>) => {
		dispatch({
			type: AppActionTypes.FETCH_ERROR_MESSAGE,
			payload: false,
		});

		try {
			const autoNewsList = await onFetchNewsList();
			dispatch({
				type: NewsActionTypes.NEWS_LIST,
				payload: autoNewsList
				
			});

		} catch(e) {
			dispatch({
				type: AppActionTypes.FETCH_ERROR_MESSAGE,
				payload: true,
			});
		}
	}
};

//общая функция для загрузки данных новости
async function onFetchNewsItem(id: NewsID) {
	const newsItem = await Api.onFetchNewsItem<ILittleNewsItemCard>(id);
	const fetchNewsItem = onConvertDate<ILittleNewsItemCard, ILittleNewsItemCardWithConvDate>(newsItem);
	return fetchNewsItem
};

//первичная загрузка новости при входе на её страницу
export function onLoadNewsItem(id: NewsID) {
	return async (dispatch: Dispatch<AppActions | NewsActions>) => {
		dispatch({
			type: AppActionTypes.SHOW_LOADER_PAGE
		});

		dispatch({
			type: AppActionTypes.FETCH_ERROR_MESSAGE,
			payload: false,
		});

		try {
			const fetchNewsItem = await onFetchNewsItem(id);
			const newsItem = await onLoadComments<ILittleNewsItemCardWithConvDate, IFullNewsItem>(fetchNewsItem);
			
			dispatch({
				type: NewsActionTypes.NEWS_ITEM,
				payload: newsItem
			});

		} catch(e) {
			dispatch({
				type: AppActionTypes.FETCH_ERROR_MESSAGE,
				payload: true,
			});

		} finally {
			dispatch({
				type: AppActionTypes.HIDE_LOADER_PAGE
			});
		}
	}
};

//обновление новости по клику на кнопку
export function onUpdateCommentsNewsItem(id: NewsID) {
	return async (dispatch: Dispatch<AppActions | NewsActions>) => {
		dispatch({
			type: AppActionTypes.SHOW_LOADER_COMMENTS
		});

		dispatch({
			type: AppActionTypes.FETCH_ERROR_MESSAGE,
			payload: false
		});

		try {
			const fetchNewsItem = await onFetchNewsItem(id);
			const newsItem = await onLoadComments<ILittleNewsItemCardWithConvDate, IFullNewsItem>(fetchNewsItem);

			setTimeout(() => {
				dispatch({
					type: NewsActionTypes.NEWS_ITEM,
					payload: newsItem
				});
			}, 500);

		} catch(e) {
			setTimeout(() => {
				dispatch({
					type: AppActionTypes.FETCH_ERROR_MESSAGE,
					payload: true,
				});
			}, 500);

		} finally {
			setTimeout(() => {
				dispatch({
					type: AppActionTypes.HIDE_LOADER_COMMENTS
				});
			}, 500);
		}
	}
};

//автообновление страницы новости
export function autoUpdateNewsItem(id: NewsID) {
	return async (dispatch: Dispatch<AppActions | NewsActions>) => {
		dispatch({
			type: AppActionTypes.FETCH_ERROR_MESSAGE,
			payload: false,
		});

		try {
			const fetchNewsItem = await onFetchNewsItem(id);
			const newsItem = await onLoadComments<ILittleNewsItemCardWithConvDate, IFullNewsItem>(fetchNewsItem);

			dispatch({
				type: NewsActionTypes.NEWS_ITEM,
				payload: newsItem
			});
			
		} catch(e) {
			dispatch({
				type: AppActionTypes.FETCH_ERROR_MESSAGE,
				payload: true,
			});
		}
	}
};

//рекурсивная функция загрузки комментариев новости
async function onLoadComments<acceptedTypeOfLoadComments, returningTypeOfLoadComments>(newsPost: acceptedTypeOfLoadComments) : Promise<returningTypeOfLoadComments> {
	const news = JSON.parse(JSON.stringify(newsPost));

	if (!news.kids) {
		return news;
	} else {
		const newsKids = await Promise.all(news.kids.map((item: NewsID) => Api.onFetchNewsItem<TypesOfComments>(item)));
		const activeNewsKids = newsKids.filter(item => !item.deleted && !item.dead);

		activeNewsKids.sort((a, b) => a.time - b.time);
		const newsComments = activeNewsKids.map(item => onConvertDate<INormalNewsItemComment, INormalNewsItemCommentWithConvDate>(item));

		news.kids = await Promise.all(newsComments.map(item => onLoadComments<INormalNewsItemCommentWithConvDate, IFullNewsItemComment>(item)));
		return news;
	}
};


