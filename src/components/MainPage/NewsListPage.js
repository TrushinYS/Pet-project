import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsList } from '../../redux/actions';
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

	/*useEffect(() => {
		console.log('auto update');
		dispatch(autoUpdateNewsList())
	}, [newsList])*/
	
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
//пытался сделать автообновление данных с сервера, поместив нижеуказанный код в useEffect, но при переходе на другую страницу, данные всё также обновляются
/*setTimeout(function Update() {
	console.log('автоматическое обновление')
	dispatch(fetchNewsList())
	setTimeout(Update, 10000)
}, 10000)*/