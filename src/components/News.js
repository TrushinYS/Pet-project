import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../redux/actions";


export default function News( {news} ) {
	const dispatch = useDispatch();
	const newsPost = useSelector(state => state.newsPost);

	useEffect(() => {
		dispatch(fetchNews(news))
	}, [])

	return (
		<article>
			{JSON.stringify(newsPost)}
		</article>
	)
}