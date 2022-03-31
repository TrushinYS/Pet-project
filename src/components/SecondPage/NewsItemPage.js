import React, { useEffect, useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom'
import {FaRegComments} from 'react-icons/fa'
import { fetchNewsItem, autoUpdateNewsItem } from "../../redux/actions";
import CommentsList from './CommentsList'
import Loader from '../Loader';

export default function NewsItemPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const loader = useSelector(state => state.app)
	const newsItem = useSelector(state => state.news.newsItem)

	const params = useParams();
	const newsItemID = params.id;

	useEffect(() => {
		dispatch(fetchNewsItem(newsItemID));
	}, [])

	useEffect(() => {
		dispatch(autoUpdateNewsItem(newsItemID))
	}, [newsItem])

	const backOnNewsListPage = () => {
		navigate('/')
	}

	const onUpdateComments = () => {
		dispatch(autoUpdateNewsItem(newsItemID));
	}

	const onCheckAmountComments = (newsItem) => {
		if (newsItem.kids) {
			const amountComments = newsItem.kids.filter(item => !item.deleted)
			return amountComments.length
		}
		return '0'
	}

	const amountComments = useMemo(() => {
		console.log('use memo')
		return (onCheckAmountComments(newsItem))
	}, [newsItem.kids])

	return (
		<main className="container center news-item-page">
			<section>
				<button onClick={backOnNewsListPage} className="waves-effect waves-light btn news-item-page-btn">К списку новостей</button>
				<button onClick={onUpdateComments} className="waves-effect waves-light btn news-item-page-btn">Обновить комментарии</button>
			</section>
			<section>
				{loader ? <Loader/> : (
					<article className="card blue-grey darken-1 news-item-article">
						<div className="card-content white-text">
							<p className="card-title">{newsItem?.title}</p>
							<a target={'_blank'} className="orange-text" href={newsItem?.url}>URL: {newsItem?.url}</a>
							<p>Автор: {newsItem?.by} | Дата: {newsItem?.time} | <FaRegComments/> : {amountComments}</p>
						</div>
						{newsItem.kids && <CommentsList newsItem = {newsItem} amountComments = {amountComments}/>}
					</article>
				)}
			</section>
		</main>
	)
}

//{newsItem?.kids ? newsItem.kids.length : 0}