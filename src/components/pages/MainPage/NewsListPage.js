import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onLoadNewsList, autoUpdateNewsList } from '../../../redux/actions';
import NewsItem from './NewsItem';
import Loader from '../../shared/Loader';

export default function NewsListPage() {
	const dispatch = useDispatch();

	const pageLoader = useSelector(state => state.app.page)
	const newsList = useSelector(state => state.news.newsList);
	
	const onUpdateNews = () => {
		dispatch(onLoadNewsList());
	}

	useEffect(() => {
		if (Object.keys(newsList).length !== 0) {
			return
		} else {
			console.log('обычный fetch');
			dispatch(onLoadNewsList());
		}
	}, [])

	useEffect(() => {
		console.log('autoUpdateList')
		dispatch(autoUpdateNewsList())
	}, [newsList])
	
	return (
		<div className="container center">
			<h3>Последние 100 новостей</h3>
			<section>
				<button onClick={onUpdateNews} className="waves-effect waves-light btn"><i className="material-icons left">cloud</i>Обновить новости</button>
				<div>
					{pageLoader ? <Loader/> : newsList.map((news) => <NewsItem key = {news.id} news ={news}/>)}
				</div>
			</section>
		</div>
	)
}
