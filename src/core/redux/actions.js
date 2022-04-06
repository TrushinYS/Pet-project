import { 
	HIDE_LOADER_PAGE, 
	NEWS_ITEM, NEWS_LIST, 
	SHOW_LOADER_PAGE, 
	SHOW_LOADER_COMMENTS, 
	HIDE_LOADER_COMMENTS, 
	FETCH_ERROR_MESSAGE} from "./types";

import { onConvertDate } from "../helpers/index";
import Api from '../shared/api/index.ts';

let timerNewsList = null; 
let timerNewsItemPage = null;

let timeSecond = 0;
let timerToUpdate = null;

//общая функция для загрузки новостей
async function onFetchNewsList() {
	const newsListID = await Api.fetchNewsListID();
	const newsList = await Api.fetchNewsList(newsListID);

	const fetchNewsList = newsList.map(item => onConvertDate(item))
	return fetchNewsList
}

//первичная/принудительная(по клику на кнопку) загрузка новостей
export function onLoadNewsList() {
	clearTimeout(timerNewsList)
	
	return async dispatch => {
		dispatch({
			type: SHOW_LOADER_PAGE,
		});
		dispatch({
			type: FETCH_ERROR_MESSAGE,
			payload: false,
		})
		
		try {
			const newsList = await onFetchNewsList()
			dispatch({
				type: NEWS_LIST,
				payload: newsList
			});

		} catch(e) {
			dispatch({
				type: FETCH_ERROR_MESSAGE,
				payload: true,
			});

		} finally {
			dispatch({
				type: HIDE_LOADER_PAGE
			});
		}
	}
}

//автоматическое обновление новостей
export function autoUpdateNewsList() {
	clearTimeout(timerNewsItemPage)
	clearTimeout(timerNewsList)
	clearInterval(timerToUpdate);

	const timeSecNewsList = timeSecond * 1000;
	timeSecond = 0;

	return async dispatch => {
		return timerNewsList = setTimeout(async function() {
			dispatch({
				type: FETCH_ERROR_MESSAGE,
				payload: false,
			});

			try {
				const autoNewsList = await onFetchNewsList()
				dispatch({
					type: NEWS_LIST,
					payload: autoNewsList
					
				})

			} catch(e) {
				dispatch({
					type: FETCH_ERROR_MESSAGE,
					payload: true,
				});
			}
		}, 60000 - timeSecNewsList)
	}
}

//общая функция для загрузки данных новости
async function onFetchNewsItem(id) {
	const newsItem = await Api.fetchNewsItem(id);
	const fetchNewsItem = onConvertDate(newsItem);
	return fetchNewsItem
}

//первичная загрузка новости при входе на её страницу
export function onLoadNewsItem(id) {
	clearTimeout(timerNewsList)
	clearInterval(timerToUpdate)

	timerToUpdate = setInterval(() => {
		if (timeSecond === 60) {
			timeSecond = 60
			clearInterval(timerToUpdate)
		}
		++timeSecond
	}, 1000)

	return async dispatch => {
		dispatch({
			type: SHOW_LOADER_PAGE
		});

		dispatch({
			type: FETCH_ERROR_MESSAGE,
			payload: false,
		});

		try {
			const fetchNewsItem = await onFetchNewsItem(id);
			const newsItem = await onLoadComments(fetchNewsItem);
			
			dispatch({
				type: NEWS_ITEM,
				payload: newsItem
			});

		} catch(e) {
			dispatch({
			type: FETCH_ERROR_MESSAGE,
			payload: true,
		});

		} finally {
			dispatch({
				type: HIDE_LOADER_PAGE
			});
		}
	}
}

//обновление новости по клику на кнопку
export function onUpdateCommentsNewsItem(id) {
	clearTimeout(timerNewsItemPage);

	return async dispatch => {
		dispatch({
			type: SHOW_LOADER_COMMENTS
		});

		dispatch({
			type: FETCH_ERROR_MESSAGE,
			payload: false,
		});

		try {
			const fetchNewsItem = await onFetchNewsItem(id)
			const newsItem = await onLoadComments(fetchNewsItem);

			setTimeout(() => {
				dispatch({
					type: NEWS_ITEM,
					payload: newsItem
				});
			}, 500)

		} catch(e) {
			setTimeout(() => {
				dispatch({
					type: FETCH_ERROR_MESSAGE,
					payload: true,
				});
			}, 500)

		} finally {
			setTimeout(() => {
				dispatch({
					type: HIDE_LOADER_COMMENTS
				});
			}, 500)
		}
	}
}

//автообновление страницы новости
export function autoUpdateNewsItem(id) {
	clearTimeout(timerNewsItemPage);

	return async dispatch => {
		return timerNewsItemPage = setTimeout(async function() {
			dispatch({
				type: FETCH_ERROR_MESSAGE,
				payload: false,
			});

			try {
				const fetchNewsItem = await onFetchNewsItem(id);
				const newsItem = await onLoadComments(fetchNewsItem);

				dispatch({
					type: NEWS_ITEM,
					payload: newsItem
				})
				
			} catch(e) {
				dispatch({
					type: FETCH_ERROR_MESSAGE,
					payload: true,
				});
			}
		}, 60000)
	}
}

//рекурсивная функция загрузки комментариев новости
async function onLoadComments(newsPost) {
	const news = JSON.parse(JSON.stringify(newsPost));
	if (!news.kids) {
		return news;
	} else {
		const newsKids = await Api.fetchNewsList(news.kids);
		const activeNewsKids = newsKids.filter(item => !item.deleted && !item.dead);
		activeNewsKids.sort((a, b) => a.time - b.time);

		const newsComments = activeNewsKids.map(item => onConvertDate(item));
		news.kids = await Promise.all(newsComments.map(item => onLoadComments(item)));
		return news;
	}
}

