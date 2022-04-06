import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {FaRegComments} from 'react-icons/fa';
import {  autoUpdateNewsItem} from "../../../../core/redux/actions";
import CommentsList from './CommentsList';
import Loader from '../../../elements/Loader';

export default function FullNewsItemCard({ newsItemID }) {
	const dispatch = useDispatch();

	const commentsLoader = useSelector(state => state.app.comments);
	const newsItem = useSelector(state => state.news.newsItem)

	useEffect(() => {
		console.log('autoUpdateNewsItem')
		dispatch(autoUpdateNewsItem(newsItemID))
	}, [newsItem])

	return (
		<article className="card blue-grey darken-1 news-item-article">
			<div className="card-content white-text">
				<p className="card-title">{newsItem.title || 'Заголовок новости'}</p>
				<a target={'blank'} className="orange-text" href={newsItem.url || '#!'}>URL: {newsItem.url || 'Отсутствует'}</a>
				<p>Автор: {newsItem.by || 'Неизвестен'} | Дата: {newsItem.time || 'Время неизвестно'} | <FaRegComments/> : {newsItem.kids ? newsItem.kids.length : 0}</p>
			</div>
			{commentsLoader ? <Loader/> : <CommentsList newsItem = {newsItem}/>}
		</article>
	)
}