import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsList } from '../redux/actions';
import News from './News';

export default function NewsList() {
	const dispatch = useDispatch();
	const newsList = useSelector(state => state.newsList);

	useEffect(() => {
		dispatch(fetchNewsList())
	}, [])

	return (
		<section>
			{newsList.map((news) => <News key = {news} news ={news}/>)}
		</section>
	)
}
//{newsList.map((news) => <News key = {news} news ={news}/>)}