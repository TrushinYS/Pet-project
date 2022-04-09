import { ILittleNewsItemCardWithConvDate, 
	ILittleNewsItemCard, 
	INormalNewsItemComment, 
	INormalNewsItemCommentWithConvDate } from "../redux/types/Newstypes";

//функция для преобразования даты
export function onConvertDate(newsItem: ILittleNewsItemCard): ILittleNewsItemCardWithConvDate {
	const news = JSON.parse(JSON.stringify(newsItem))
	const newsDate = new Date(news.time * 1000);

	const newsHours = newsDate.getHours();
	const newsMin = newsDate.getMinutes();
	const newsDay = newsDate.getDate();
	const newsMonth = newsDate.getMonth();
	const newsYear = newsDate.getFullYear();
	
	const dateArr = [newsHours, newsMin, newsDay, newsMonth, newsYear];
	const convDateArr = dateArr.map(item => item < 10 ? `0${item}` : item);

	news.time = `${convDateArr[0]}:${convDateArr[1]} ${convDateArr[2]}.${convDateArr[3]}.${convDateArr[4]}`
	return news
}

export function onConvertDateComment(commentItem: INormalNewsItemComment): INormalNewsItemCommentWithConvDate {
	const news = JSON.parse(JSON.stringify(commentItem))
	const newsDate = new Date(news.time * 1000);

	const newsHours = newsDate.getHours();
	const newsMin = newsDate.getMinutes();
	const newsDay = newsDate.getDate();
	const newsMonth = newsDate.getMonth();
	const newsYear = newsDate.getFullYear();
	
	const dateArr = [newsHours, newsMin, newsDay, newsMonth, newsYear];
	const convDateArr = dateArr.map(item => item < 10 ? `0${item}` : item);

	news.time = `${convDateArr[0]}:${convDateArr[1]} ${convDateArr[2]}.${convDateArr[3]}.${convDateArr[4]}`
	return news
}
