import React, { useMemo } from "react";
import { useNavigate } from 'react-router-dom'

export default function NewsItem( {news} ) {
	const navigate= useNavigate();

	const onCheckDate = () => {
		const postDate = new Date(news?.time*1000)
		const postYear = postDate.getFullYear();
		let postMonth = postDate.getMonth();
		const postDay = postDate.getDate();
		if (postMonth < 10) {
			postMonth = `0${postMonth}`;
		}
		const postHours = postDate.getHours();
		const postMin = postDate.getMinutes();
		return `${postHours}:${postMin} ${postDay}.${postMonth}.${postYear}`;
	}

	const dateNews = useMemo(() => {
		return (onCheckDate(news))
	}, [news])

	const openNewsItemPage = () => {
		navigate('/' + news.id)
	}

	return (
		<article onClick={openNewsItemPage} className="card blue-grey darken-1 cursor">
			<div className="card-content white-text">
				<p className="card-title">{news?.title}</p>
			</div>
			<div className="card-action">
				<span className="orange-text">Рейтинг: {news?.score} | Автор: {news?.by} | Дата публикации: {dateNews} </span>
			</div>
		</article>
		
	)
}