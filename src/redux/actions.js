import { HIDE_LOADER, NEWS_ITEM, NEWS_LIST, SHOW_LOADER } from "./types"

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
	return async dispatch => {
		dispatch(showLoader());

		const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
		const news = await response.json()
		dispatch(loadComments(news))

		setTimeout(() => {
			dispatch({
				type: NEWS_ITEM,
				payload: news
			})
			
			dispatch(hideLoader())
		}, 1000)
	}
}

function loadComments(comment) {
	return async dispatch => {
		if (!comment.kids) {
			return 
		} else {
			const commentKids = await Promise.all(comment.kids.map(item => fetch(`https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`)))
			const commentKidsJson = await Promise.all(commentKids.map(item => item.json()))

			comment.kids = commentKidsJson
			commentKidsJson.map(item => dispatch(loadComments(item)))
			
	}}
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