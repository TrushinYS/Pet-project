import { 
	HIDE_LOADER_PAGE, 
	NEWS_ITEM, NEWS_LIST, 
	SHOW_LOADER_PAGE, 
	SHOW_LOADER_COMMENTS, 
	HIDE_LOADER_COMMENTS } from "./types"

let timerNewsList = null; 
let timerNewsItemPage = null;

let timeSecond = 0;
let timerToUpdate = null;

//общая функция для загрузки новостей
async function onFetchNewsList() {
	const response = await fetch('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty&orderBy=%22$key%22&limitToFirst=100')

	const json = await response.json();

	const newsList = await Promise.all(json.map((item) => fetch(`https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`)))

	const newsListJSON = await Promise.all(newsList.map(item => item.json()))
	const fetchNewsList = newsListJSON.map(item => onConvertDate(item))
	return fetchNewsList
}

//первичная/принудительная(по клику на кнопку) загрузка новостей
export function onLoadNewsList() {
	clearTimeout(timerNewsList)
	
	return async dispatch => {
		dispatch({
			type: SHOW_LOADER_PAGE
		});

		const newsList = await onFetchNewsList()
		
		dispatch({
			type: NEWS_LIST,
			payload: newsList
		});

		dispatch({
			type: HIDE_LOADER_PAGE
		});
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
			const autoNewsList = await onFetchNewsList()
	
			dispatch({
				type: NEWS_LIST,
				payload: autoNewsList
				
			})
		}, 60000 - timeSecNewsList)
	}
}

//общая функция для загрузки данных новости
async function onFetchNewsItem(id) {
	const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);

	const newsItem = await response.json();
	const fetchNewsItem = await onConvertDate(newsItem);
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
		} else {
			++timeSecond
		}
	}, 1000)

	return async dispatch => {
		dispatch({
			type: SHOW_LOADER_PAGE
		});

		const fetchNewsItem = await onFetchNewsItem(id)
		const newsItem = await onLoadComments(fetchNewsItem);

		setTimeout(() => {
			dispatch({
				type: NEWS_ITEM,
				payload: newsItem
			});
			
			dispatch({
				type: HIDE_LOADER_PAGE
			});
		}, 1000)

		
	}
}

//обновление новости по клику на кнопку
export function onUpdateCommentsNewsItem(id) {
	clearTimeout(timerNewsItemPage);

	return async dispatch => {
		dispatch({
			type: SHOW_LOADER_COMMENTS
		});

		const fetchNewsItem = await onFetchNewsItem(id)
		const newsItem = await onLoadComments(fetchNewsItem);

		setTimeout(() => {
			dispatch({
				type: NEWS_ITEM,
				payload: newsItem
			});

			dispatch({
			type: HIDE_LOADER_COMMENTS
		});
		}, 1000)
	}
}

//автообновление страницы новости
export function autoUpdateNewsItem(id) {
	clearTimeout(timerNewsItemPage);

	return async dispatch => {
		return timerNewsItemPage = setTimeout(async function() {
			const fetchNewsItem = await onFetchNewsItem(id);
			const newsItem = await onLoadComments(fetchNewsItem);
	
			dispatch({
				type: NEWS_ITEM,
				payload: newsItem
			})
		}, 60000)
	}
}

//рекурсивная функция загрузки комментариев новости
async function onLoadComments(newsPost) {
	const news = JSON.parse(JSON.stringify(newsPost))
	if (!news.kids) {
		return news
	} else {
		const newsKids = await Promise.all(news.kids.map(item => fetch(`https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`)))

		const newsKidsJson = await Promise.all(newsKids.map(item => item.json()))

		newsKidsJson.sort((a, b) => a.time - b.time)
		const newsComments = newsKidsJson.map(item => onConvertDate(item))
		news.kids = await Promise.all(newsComments.map(item => onLoadComments(item)));

		return news;
	}
}

//функция для преобразования даты
function onConvertDate(newsPost) {
	const news = JSON.parse(JSON.stringify(newsPost))
	const postDate = new Date(news.time * 1000);

	const postHours = postDate.getHours();
	const postMin = postDate.getMinutes();
	const postDay = postDate.getDate();
	const postMonth = postDate.getMonth();
	const postYear = postDate.getFullYear();
	
	const dateArr = [postHours, postMin, postDay, postMonth, postYear];
	const convDateArr = dateArr.map(item => item < 10 ? `0${item}` : item);

	news.time = `${convDateArr[0]}:${convDateArr[1]} ${convDateArr[2]}.${convDateArr[3]}.${convDateArr[4]}`
	return news;
}

