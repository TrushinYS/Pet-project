import { ILittleNewsItemCardWithConvDate, 
	ILittleNewsItemCard, 
	NewsID, 
	TypesOfComments } from '@Redux/types/Newstypes';

import { onConvertDate } from '@Helpers/index';

const hackerNewsID: string = 'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty&orderBy=%22$key%22&limitToFirst=100';
const hackerNewsItemPart1: string = 'https://hacker-news.firebaseio.com/v0/item/';
const hackerNewsItemPart2: string = '.json?print=pretty';

export default class Api {
	static async onFetchNewsListID(): Promise<number[]> {
		const response = await fetch(hackerNewsID);
		const json = await response.json();
		return json;
	};

	static async onFetchNewsList(newsList: number[]): Promise<ILittleNewsItemCardWithConvDate[]> {
		const response = await Promise.all(newsList.map((item: number) => fetch(hackerNewsItemPart1 + `${item}` + hackerNewsItemPart2)));
		const json = await Promise.all(response.map(item => item.json()));
		const fetchNewsList = json.map(item => onConvertDate(item));

		return fetchNewsList
	};

	static async onFetchNewsItem(id: NewsID): Promise<ILittleNewsItemCard> {
		const response = await fetch(hackerNewsItemPart1 + `${id}` + hackerNewsItemPart2);
		const json = await response.json();
		return json
	};

	static async onFetchNewsItemComments(id: NewsID): Promise<TypesOfComments> {
		const response = await fetch(hackerNewsItemPart1 + `${id}` + hackerNewsItemPart2);
		const json = await response.json();
		return json
	};
}