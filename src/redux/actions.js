import { HIDE_LOADER, NEWS_ITEM, NEWS_LIST, SHOW_LOADER } from "./types"

let timerNewsList = null;
let timerNewsItemPage = null;

export function fetchNewsList() {
	clearTimeout(timerNewsItemPage)
	return async dispatch => {
		dispatch(showLoader())

		const response = await fetch('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty')

		const json = await response.json();
		json.splice(100)

		const newsList = await Promise.all(json.map((item) => fetch(`https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`)))

		const newsListJSON = await Promise.all(newsList.map(item => item.json()))
		const fetchNewsList = await Promise.all(newsListJSON.map(item => onConvertDate(item)))
		
		dispatch({
			type: NEWS_LIST,
			payload: fetchNewsList
			
		});

		dispatch(hideLoader())
	}
}

export function autoUpdateNewsList() {
	clearTimeout(timerNewsList)

	return async dispatch => {
		const autoResponse = await fetch('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty')

		const autoJson = await autoResponse.json();
		autoJson.splice(100);

		const autoNewsList = await Promise.all(autoJson.map((item) => fetch(`https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`)));

		const autoNewsListJSON = await Promise.all(autoNewsList.map(item => item.json()));
		const autoFetchNewsList = await Promise.all(autoNewsListJSON.map(item => onConvertDate(item)));

		timerNewsList = setTimeout(() => {
			console.log('timerNewsList');

			dispatch({
				type: NEWS_LIST,
				payload: autoFetchNewsList
				
			})
		}, 60000)
	}
}

export function fetchNewsItem(id) {

	return async dispatch => {
		dispatch(showLoader());

		const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);

		const newsItem = await response.json();
		const fetchNewsItem = await onConvertDate(newsItem);
		dispatch(loadComments(fetchNewsItem));

		setTimeout(() => {
			dispatch({
				type: NEWS_ITEM,
				payload: newsItem
			});
			
			dispatch(hideLoader())
		}, 1000)

		
	}
}

export function autoUpdateNewsItem(id) {
	clearTimeout(timerNewsList);
	clearTimeout(timerNewsItemPage);

	return async dispatch => {
		const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);

		const newsItem = await response.json();
		const fetchNewsItem = await onConvertDate(newsItem);
		dispatch(loadComments(fetchNewsItem));

		timerNewsItemPage = setTimeout(() => {
			dispatch({
				type: NEWS_ITEM,
				payload: fetchNewsItem
			})
		}, 60000)
	}
}

function loadComments(news) {
	return async dispatch => {
		if (!news.kids) {
			return

		} else {
			const newsKids = await Promise.all(news.kids.map(item => fetch(`https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`)))

			const newsKidsJson = await Promise.all(newsKids.map(item => item.json()))
			await Promise.all(newsKidsJson.sort((a, b) => a.time - b.time))
			const newsComments = await Promise.all(newsKidsJson.map(item => onConvertDate(item)))

			news.kids = newsComments;
			news.kids.map(item => dispatch(loadComments(item)))
		}
	}
}

async function onConvertDate(news) {
	const postDate = new Date(news.time*1000)
	const postYear = postDate.getFullYear();
	
	let postMonth = postDate.getMonth();
	postMonth = postMonth < 10 ? `0${postMonth}` : postMonth
	
	let postDay = postDate.getDate();
	postDay = postDay < 10 ? `0${postDay}` : postDay
			
	const postHours = postDate.getHours();
	const postMin = postDate.getMinutes();

	news.time = `${postHours}:${postMin} ${postDay}.${postMonth}.${postYear}`
	return news;
}

function showLoader() {
	return {
		type: SHOW_LOADER
	}
}

function hideLoader() {
	return {
		type: HIDE_LOADER
	}
}