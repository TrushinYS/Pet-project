import { FC, useEffect } from 'react';
import LittleNewsItemCard from './LittleNewsItemCard/LittleNewsItemCard';
import Loader from '../../elements/Loader';
import ErrorMessage from '../../elements/ErrorMessage';
import { useTypedSelector } from '../../../core/hooks/useTypedSelector';
import { useActions } from '../../../core/hooks/useActions';

const NewsListPage: FC = () => {
	const newsList = useTypedSelector(state => state.news.newsList);
	const pageLoader = useTypedSelector(state => state.app.page)
	const fetchErrorMessage = useTypedSelector(state => state.app.fetchError)

	const {onLoadNewsList, autoUpdateNewsList} = useActions()
	
	const onUpdateNews = () => {
		onLoadNewsList();
	};

	useEffect(() => {
		if (Object.keys(newsList).length !== 0) {
			return
		} else {
			console.log('обычный fetch');
			onLoadNewsList();
		}
	}, []);

	useEffect(() => {
		console.log('autoUpdateList');
		autoUpdateNewsList();
	}, [newsList]);
	
	return (
		<div className="container center">
			{fetchErrorMessage && 
				<ErrorMessage/>
			}
			<h3>Последние 100 новостей</h3>
			<section>
				<button onClick={onUpdateNews} className="waves-effect waves-light btn"><i className="material-icons left">cloud</i>Обновить новости</button>
				<div>
					{pageLoader ? <Loader/> : newsList.map((news) => <LittleNewsItemCard key = {news.id} news ={news}/>)}
				</div>
			</section>
		</div>
	)
}

export default NewsListPage;
