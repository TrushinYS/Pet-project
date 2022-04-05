import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { onUpdateCommentsNewsItem, onLoadNewsItem } from "../../../redux/actions";
import NewsItemCard from './NewsItemCard';
import Loader from '../../shared/Loader';

export default function NewsItemPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const pageLoader = useSelector(state => state.app.page)

	const params = useParams();
	const newsItemID = params.id;

	useEffect(() => {
		console.log('onLoadNewsItem')
		dispatch(onLoadNewsItem(newsItemID));
	}, [])

	const backOnNewsListPage = () => {
		navigate('/')
	}

	const onUpdateComments = () => {
		dispatch(onUpdateCommentsNewsItem(newsItemID));
	}

	return (
		<main className="container center news-item-page">
			<section>
				<button onClick={backOnNewsListPage} className="waves-effect waves-light btn news-item-page-btn">К списку новостей</button>
				<button onClick={onUpdateComments} className="waves-effect waves-light btn news-item-page-btn">Обновить комментарии</button>
			</section>
			<section>
				{pageLoader ? <Loader/> : <NewsItemCard/>}
			</section>
		</main>
	)
}

//{newsItem?.kids ? newsItem.kids.length : 0}