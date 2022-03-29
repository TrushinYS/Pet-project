import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom'
import {FaRegComments} from 'react-icons/fa'
import { fetchNewsItem, autoUpdateComments, loadComments } from "../../redux/actions";
import Loader from '../Loader';

export default function NewsItemPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const loader = useSelector(state => state.app)
	const news = useSelector(state => state.news.newsItem)
	const newsComments = useSelector(state => state.news.newsItemComments)

	const params = useParams();
	const newsID = params.id;

	useEffect(() => {
		dispatch(fetchNewsItem(30808945));
	}, [])

	useEffect(() => {
		dispatch(autoUpdateComments(news))
	}, [newsComments])

	const backOnNewsListPage = () => {
		navigate('/')
	}

	const onUpdateComments = () => {
		dispatch(loadComments(news));
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
							<p className="white-text">Автор: {news?.by} | Дата: {dateNews} | <FaRegComments/> : {news?.kids ? news.kids.length : 0}</p>
						</div>
						<div className="card-action">
							
						</div>
					</article>
				)}
			</section>
		</main>
	)
}