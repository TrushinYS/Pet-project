import { Dispatch } from 'redux';
import { AppActions, AppActionTypes } from '@Redux/types/Apptypes';
import { ILittleNewsItemCardWithConvDate, 
	NewsActions, 
	NewsActionTypes, 
	NewsID, 
	IFullNewsItem } from '@Redux/types/Newstypes';
import { onConvertDate } from '@Helpers/index';
import Api from '@Api/index';

let timerNewsList: ReturnType<typeof setTimeout>;
let timerNewsItemPage: ReturnType<typeof setTimeout>;

let timeSecond: number = 0;
let timerToUpdate: ReturnType<typeof setTimeout>;

//общая функция для загрузки новостей
async function onFetchNewsList(): Promise<ILittleNewsItemCardWithConvDate[]> {
	const newsListID = await Api.onFetchNewsListID();
	const newsList = await Api.onFetchNewsList(newsListID);
	return newsList
};

//первичная/принудительная(по клику на кнопку) загрузка новостей
export function onLoadNewsList() {
	clearTimeout(timerNewsList);
	
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
	clearTimeout(timerNewsItemPage);
	clearTimeout(timerNewsList);
	clearInterval(timerToUpdate);

	const timeSecNewsList = timeSecond * 1000;
	timeSecond = 0;

	return async (dispatch: Dispatch<AppActions | NewsActions>) => {
		return timerNewsList = setTimeout(async function() {
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
		}, 60000 - timeSecNewsList)
	}
};

//общая функция для загрузки данных новости
async function onFetchNewsItem(id: NewsID) {
	const newsItem = await Api.onFetchNewsItem(id);
	const fetchNewsItem = onConvertDate(newsItem);
	return fetchNewsItem
};

//первичная загрузка новости при входе на её страницу
export function onLoadNewsItem(id: NewsID) {
	clearTimeout(timerNewsList);
	clearInterval(timerToUpdate);

	timerToUpdate = setInterval(() => {
		if (timeSecond === 60) {
			timeSecond = 60;
			clearInterval(timerToUpdate);
		}
		++timeSecond
	}, 1000);

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
			const newsItem = await onLoadComments(fetchNewsItem);
			
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
	clearTimeout(timerNewsItemPage);

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
			const newsItem = await onLoadComments(fetchNewsItem);

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
	clearTimeout(timerNewsItemPage);

	return async (dispatch: Dispatch<AppActions | NewsActions>) => {
		return timerNewsItemPage = setTimeout(async function() {
			dispatch({
				type: AppActionTypes.FETCH_ERROR_MESSAGE,
				payload: false,
			});

			try {
				const fetchNewsItem = await onFetchNewsItem(id);
				const newsItem = await onLoadComments(fetchNewsItem);

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
		}, 60000);
	}
};

//рекурсивная функция загрузки комментариев новости
async function onLoadComments(newsPost: ILittleNewsItemCardWithConvDate) : Promise<IFullNewsItem> {
	const news = JSON.parse(JSON.stringify(newsPost));

	if (!news.kids) {
		return news;
	} else {
		const newsKids = await Promise.all(news.kids.map((item: NewsID) => Api.onFetchNewsItemComments(item)));
		const activeNewsKids = newsKids.filter(item => !item.deleted && !item.dead);

		activeNewsKids.sort((a, b) => a.time - b.time);
		const newsComments = activeNewsKids.map(item => onConvertDate(item));

		news.kids = await Promise.all(newsComments.map(item => onLoadComments(item)));
		return news;
	}
};

