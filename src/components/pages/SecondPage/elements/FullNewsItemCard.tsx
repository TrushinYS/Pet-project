import { FC, useEffect } from "react";
import {FaRegComments} from 'react-icons/fa';
import CommentsList from './CommentsList';
import Loader from '../../../elements/Loader';
import {FullNewsItemCardProps} from '../../../../core/redux/types/Newstypes';
import { useTypedSelector } from "../../../../core/hooks/useTypedSelector";
import { useActions } from "../../../../core/hooks/useActions";


const FullNewsItemCard: FC<FullNewsItemCardProps> = ({ newsItemID }) => {
	const commentsLoader = useTypedSelector(state => state.app.comments);
	const newsItem = useTypedSelector(state => state.news.newsItem);

	const {autoUpdateNewsItem} = useActions();

	useEffect(() => {
		console.log('autoUpdateNewsItem')
		autoUpdateNewsItem(newsItemID)
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
};

export default FullNewsItemCard;