import { HIDE_LOADER, NEWS_ITEM, NEWS_LIST, SHOW_LOADER, NEWS_ITEM_COMMENTS } from "./types"

let timerNewsList = null;
let timerNewsItemPage = null;

export function fetchNewsList() {
	return async dispatch => {
		dispatch(showLoader());

		const response = await fetch('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty')
		const json = await response.json();
		json.splice(10)

		const news = await Promise.all(json.map((item) => fetch(`https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`)))
		const newsList = await Promise.all(news.map(item => item.json()))

		setTimeout(() => {
			dispatch({
				type: NEWS_LIST,
				payload: newsList
			})
			dispatch(hideLoader())
		}, 500)
	}
}

export function fetchNewsItem(id) {
	clearTimeout(timerNewsList)
	return async dispatch => {
		dispatch(showLoader());

		const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
		const news = await response.json()

		setTimeout(() => {
			dispatch({
				type: NEWS_ITEM,
				payload: news
			})
			
			dispatch(hideLoader())
		}, 1000)

		dispatch(loadComments(news));
	}
}

export function autoUpdateNewsList() {
	clearTimeout(timerNewsList)

	return async dispatch => {
		timerNewsList = setTimeout(() => {
			console.log('timerNewsList')
			dispatch(fetchNewsList())
		}, 10000)
	}
}

export function loadComments(news) {
	clearTimeout(timerNewsItemPage)
	const comment = JSON.parse(JSON.stringify(news));

	return async dispatch => {
		dispatch(updateComments(comment));

		dispatch({
			type: NEWS_ITEM_COMMENTS,
			payload: comment
		})
	}
}

function updateComments(comment) {
	return async dispatch => {
		if (!comment.kids) {
			return
		} else {
			const commentKids = await Promise.all(comment.kids.map(item => fetch(`https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`)))
			const commentKidsJson = await Promise.all(commentKids.map(item => item.json()))

			comment.kids = commentKidsJson;
			commentKidsJson.map(item => dispatch(updateComments(item)))
		}
	}
}

export function autoUpdateComments(comment) {
	clearTimeout(timerNewsItemPage)

	return async dispatch => {
		timerNewsItemPage = setTimeout(() => {
			console.log('timerNewsItemPage')
			dispatch(loadComments(comment))
		}, 10000)
	}
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