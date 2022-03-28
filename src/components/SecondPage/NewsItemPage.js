import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom'
import { fetchNewsItem } from "../../redux/actions";
import Loader from '../Loader';

export default function NewsItemPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const loader = useSelector(state => state.app)
	const news = useSelector(state => state.news.newsItem)

	const params = useParams();
	const newsID = params.id;

	useEffect(() => {
		dispatch(fetchNewsItem(30808945));
	}, [])

	const backOnNewsListPage = () => {
		navigate('/')
	}

	const onUpdateComments = () => {
		dispatch(fetchNewsItem(newsID))
	}

	const onCheckDateNews = () => {
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
		return (onCheckDateNews(news))
	}, [news])

	return (
		<main className="container center news-item-page">
			<section>
				<button onClick={backOnNewsListPage} className="waves-effect waves-light btn news-item-page-btn">К списку новостей</button>
				<button onClick={onUpdateComments} className="waves-effect waves-light btn news-item-page-btn">Обновить комментарии</button>
			</section>
			<section>
				{loader ? <Loader/> : (
					<article className="card blue-grey darken-1">
						<div className="card-content white-text">
							<p className="card-title">{news?.title}</p>
							<a className="orange-text" href={news?.url}>URL: {news?.url}</a>
						</div>
						<div className="card-action">
							<span className="orange-text">Рейтинг: {news?.score} | Автор: {news?.by} | Дата публикации: {dateNews} </span>
							<p className="white-text">Количество комментариев: {news?.kids ? news.kids.length : 0}</p>
							<i className="glyphicon glyphicon-cloud medium"></i>
						</div>
					</article>
				)}
			</section>
		</main>
	)
}