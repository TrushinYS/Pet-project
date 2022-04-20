const hackerNewsItemPartOne: string = 'https://hacker-news.firebaseio.com/v0/item/';
const hackerNewsItemPartTwo: string = '.json?print=pretty';

export let timeSecNewsList: number = 0;
export let timerToUpdateNewsList:ReturnType<typeof setTimeout>;

export function onRunTimerToUpdateNewsList() {
	timerToUpdateNewsList = setInterval(() => {
		if (timeSecNewsList === 59) {
			clearInterval(timerToUpdateNewsList);
		}
		++timeSecNewsList;
	}, 1000);
}

export function onResetTimeSecNewsList() {
	timeSecNewsList = 0;
}

//фнукция для получения адресной строки
export function onGetAdressBar<acceptedTypeOfGetAdressBar>(item: acceptedTypeOfGetAdressBar): string {
	const adressBar = hackerNewsItemPartOne + `${item}` + hackerNewsItemPartTwo;
	return adressBar;
}

//функция для преобразования даты
export function onConvertDate<acceptedTypeOfConvertDate, returningTypeOfConvertDate>(newsItem: acceptedTypeOfConvertDate): returningTypeOfConvertDate {
	const news = JSON.parse(JSON.stringify(newsItem));
	const newsDate = new Date(news.time * 1000);

	const newsHours = newsDate.getHours();
	const newsMin = newsDate.getMinutes();
	const newsDay = newsDate.getDate();
	const newsMonth = newsDate.getMonth();
	const newsYear = newsDate.getFullYear();
	
	const dateArr = [newsHours, newsMin, newsDay, newsMonth, newsYear];
	const convDateArr = dateArr.map(item => item < 10 ? `0${item}` : item);

	news.time = `${convDateArr[0]}:${convDateArr[1]} ${convDateArr[2]}.${convDateArr[3]}.${convDateArr[4]}`;
	return news
};
