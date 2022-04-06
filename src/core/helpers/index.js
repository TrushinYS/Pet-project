
//функция для преобразования даты
export function onConvertDate(newsPost) {
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
	return news
}
