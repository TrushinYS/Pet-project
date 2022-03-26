import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsList } from '../redux/actions';
import NewsList from './News';

export default function NewsListID() {
	const dispatch = useDispatch();
	const newsList = useSelector(state => state.newsList);

	useEffect(() => {
		dispatch(fetchNewsList())
	}, [])

	return (
		<section>
			{newsList.map((news) => <NewsList key = {news} news ={news}/>)}
		</section>
	)
}
//{newsList.map((news) => <News key = {news} news ={news}/>)}