import { ILittleNewsItemCard, NewsID} from '@Redux/types/newsTypes';

import { onGetAdressBar } from '@Shared/helpers';

const hackerNewsID: string = 'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty&orderBy=%22$key%22&limitToFirst=100';

export default class Api {
	static async onFetchNewsListID(): Promise<number[]> {
		const response = await fetch(hackerNewsID);
		const json = await response.json();
		return json;
	};

	static async onFetchNewsList(newsList: number[]): Promise<ILittleNewsItemCard[]> {
		const response = await Promise.all(newsList.map((item: number) => fetch(onGetAdressBar<Number>(item))));
		const json = await Promise.all(response.map(item => item.json()));
		return json
	};

	static async onFetchNewsItem<returningTypeOfFetchNewsItem>(id: NewsID): Promise<returningTypeOfFetchNewsItem> {
		const response = await fetch(onGetAdressBar<NewsID>(id));
		const json = await response.json();
		return json
	};

}