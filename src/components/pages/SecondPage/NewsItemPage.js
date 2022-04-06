import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { onUpdateCommentsNewsItem, onLoadNewsItem } from "../../../core/redux/actions";
import FullNewsItemCard from './elements/FullNewsItemCard';
import Loader from '../../elements/Loader';
import ErrorMessage from "../../elements/ErrorMessage";

export default function NewsItemPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const pageLoader = useSelector(state => state.app.page)
	const fetchErrorMessage = useSelector(state => state.app.fetchError)

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
			{fetchErrorMessage && 
				<ErrorMessage/>
			}
			<section>
				<button onClick={backOnNewsListPage} className="waves-effect waves-light btn news-item-page-btn">К списку новостей</button>
				<button onClick={onUpdateComments} className="waves-effect waves-light btn news-item-page-btn">Обновить комментарии</button>
			</section>
			<section>
				{pageLoader ? <Loader/> : <FullNewsItemCard newsItemID={newsItemID}/>}
			</section>
		</main>
	)
}