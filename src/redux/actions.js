import { NEWS_ID, FETCH_NEWS } from "./types"

export function fetchNewsList() {
	return async dispatch => {
		const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
		const json = await response.json();
		json.splice(2)
		/*const news = json.map(async (item) => await (await fetch(`https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`)).json())*/
		dispatch({
			type: NEWS_ID,
			payload: json
		})
	}
}

export function fetchNews(news) {
	return async dispatch => {
		const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${news}.json?print=pretty`)
		const json = await response.json()
		dispatch({
			type: FETCH_NEWS,
			payload: json
		})
	}
}