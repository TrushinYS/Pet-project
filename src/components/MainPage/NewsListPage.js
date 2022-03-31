import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsList, autoUpdateNewsList } from '../../redux/actions';
import NewsItem from './NewsItem';
import Loader from '../Loader';

export default function NewsListPage() {
	const dispatch = useDispatch();

	const loader = useSelector(state => state.app)
	const newsList = useSelector(state => state.news.newsList);
	
	const onUpdateNews = () => {
		dispatch(fetchNewsList())
	}

	useEffect(() => {
		console.log('обычный fetch')
		dispatch(fetchNewsList());
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
					{loader ? <Loader/> : newsList.map((news) => <NewsItem key = {news.id} news ={news}/>)}
				</div>
			</section>
		</div>
	)
}
