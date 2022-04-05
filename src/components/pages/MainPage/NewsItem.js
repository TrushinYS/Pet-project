import React from "react";
import { useNavigate } from 'react-router-dom'

export default function NewsItem( {news} ) {
	const navigate= useNavigate();

	const openNewsItemPage = () => {
		navigate('/' + news.id)
	}

	return (
		<article onClick={openNewsItemPage} className="card blue-grey darken-1 cursor">
			<div className="card-content white-text">
				<p className="card-title">{news?.title}</p>
			</div>
			<div className="card-action">
				<span className="orange-text">Рейтинг: {news?.score} | Автор: {news?.by} | Дата публикации: {news?.time} </span>
			</div>
		</article>
		
	)
}