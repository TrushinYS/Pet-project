import {FC, useEffect} from "react";
import { useNavigate, useParams } from 'react-router-dom';
import FullNewsItemCard from './elements/FullNewsItemCard';
import Loader from '../../elements/Loader';
import ErrorMessage from "../../elements/ErrorMessage";
import { useTypedSelector } from '../../../core/hooks/useTypedSelector';
import {useActions} from '../../../core/hooks/useActions'

const NewsItemPage: FC =() => {
	const navigate = useNavigate();
	const {onUpdateCommentsNewsItem, onLoadNewsItem} = useActions();

	const pageLoader = useTypedSelector(state => state.app.page)
	const fetchErrorMessage = useTypedSelector(state => state.app.fetchError)

	const params = useParams();
	const newsItemID = params.id;

	useEffect(() => {
		console.log('onLoadNewsItem')
		onLoadNewsItem(newsItemID);
	}, [])

	const backOnNewsListPage = () => {
		navigate('/')
	}

	const onUpdateComments = () => {
		onUpdateCommentsNewsItem(newsItemID);
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

export default NewsItemPage