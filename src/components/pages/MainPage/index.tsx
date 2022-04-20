import { FC, useEffect } from 'react';
import LittleNewsItemCard from '@Pages/MainPage/LittleNewsItemCard';
import Loader from '@Elements/Loader';
import ErrorMessage from '@Elements/ErrorMessage';
import { useTypedSelector } from '@Hooks/useTypedSelector';
import { useActions } from '@Hooks/useActions';
import { onResetTimeSecNewsList, timeSecNewsList } from '@Shared/helpers';

const NewsListPage:FC = () => {
	const newsList = useTypedSelector(state => state.news.newsList);
	const pageLoader = useTypedSelector(state => state.app.page);
	const fetchErrorMessage = useTypedSelector(state => state.app.fetchError);

	const { onLoadNewsList, autoUpdateNewsList } = useActions();
	
	const onUpdateNews = () => {
		onLoadNewsList();
	};

	useEffect(() => {
		if (newsList.length !== 0) {
			return
		}
		onLoadNewsList();
	}, []);

	useEffect(() => {
		let timeMSecNewsList = timeSecNewsList * 1000;
		const timerNewsList = setTimeout(() => {
			autoUpdateNewsList();
		}, 60000 - timeMSecNewsList);
		return (() => {
			clearTimeout(timerNewsList);
			onResetTimeSecNewsList();
		});
	}, [newsList]);
	
	return (
		<div className = 'container center'>
			{fetchErrorMessage && 
				<ErrorMessage/>
			}
			<h3>Последние 100 новостей</h3>
			<section>
				<button onClick = {onUpdateNews} className = 'waves-effect waves-light btn'><i className = 'material-icons left'>cloud</i>Обновить новости</button>
				<div>
					{pageLoader ? <Loader/> : newsList.map((news) => <LittleNewsItemCard key = {news.id} news = {news}/>)}
				</div>
			</section>
		</div>
	)
};

export default NewsListPage;
