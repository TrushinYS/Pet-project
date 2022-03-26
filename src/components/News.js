import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../redux/actions";


export default function NewsList( {news} ) {
	const dispatch = useDispatch();
	const newsPost = useSelector(state => state.newsPost.find(item => item.id === news));

	useEffect(() => {
		dispatch(fetchNews(news))
	}, [])

	return (
		<article>
			{newsPost?.title}
		</article>
	)
}