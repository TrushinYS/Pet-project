import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import {FaRegComments} from 'react-icons/fa';
import { onLoadNewsItem, autoUpdateNewsItem } from "../../../redux/actions";
import CommentsList from './CommentsList';
import Loader from '../../shared/Loader';

export default function NewsItemCard() {
	const dispatch = useDispatch();

	const commentsLoader = useSelector(state => state.app.comments);
	const newsItem = useSelector(state => state.news.newsItem)

	const params = useParams();
	const newsItemID = params.id;

	useEffect(() => {
		console.log('autoUpdateNewsItem')
		dispatch(autoUpdateNewsItem(newsItemID))
	}, [newsItem])

	const onCheckAmountComments = (newsItem) => {
		if (newsItem.kids) {
			const amountComments = newsItem.kids.filter(item => !item.deleted)
			return amountComments.length
		}
		return 0
	}

	const amountComments = useMemo(() => {
		console.log('use memo')
		return (onCheckAmountComments(newsItem))
	}, [newsItem.kids])

	return (
		<article className="card blue-grey darken-1 news-item-article">
			<div className="card-content white-text">
				<p className="card-title">{newsItem.title || 'Заголовок новости'}</p>
				<a target={'_blank'} className="orange-text" href={newsItem.url || '#!'}>URL: {newsItem.url || 'Ссылка отсутствует'}</a>
				<p>Автор: {newsItem.by || 'Неизвестен'} | Дата: {newsItem.time || 'Время неизвестно'} | <FaRegComments/> : {amountComments}</p>
			</div>
			{commentsLoader ? <Loader/> : <CommentsList newsItem = {newsItem} amountComments = {amountComments}/>}
		</article>
	)
}