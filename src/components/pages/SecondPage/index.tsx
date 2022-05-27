import { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FullNewsItemCard from '@Pages/SecondPage/FullNewsItemCard';
import Loader from '@Elements/Loader';
import ErrorMessage from '@Elements/ErrorMessage';
import { useTypedSelector } from '@Hooks/useTypedSelector';
import { useActions } from '@Hooks/useActions';
import { onRunTimerToUpdateNewsList, timerToUpdateNewsList } from '@Shared/helpers';

const NewsItemPage: FC = () => {
	const navigate = useNavigate();
	const { onUpdateCommentsNewsItem, onLoadNewsItem } = useActions();

	const pageLoader = useTypedSelector(state => state.app.page);
	const fetchErrorMessage = useTypedSelector(state => state.app.fetchError);

	const params = useParams();
	const newsItemID = params.id;

	useEffect(() => {
		onLoadNewsItem(newsItemID);
		onRunTimerToUpdateNewsList();
	}, []);

	const backOnNewsListPage = () => {
		navigate('/Pet-project/');
		clearInterval(timerToUpdateNewsList);
	};

	const onUpdateComments = () => {
		onUpdateCommentsNewsItem(newsItemID);
	};

	return (
		<main className='container center news-item-page'>
			{fetchErrorMessage &&
				<ErrorMessage />
			}
			<section>
				<button onClick={backOnNewsListPage} className='waves-effect waves-light btn news-item-page-btn'>К списку новостей</button>
				<button onClick={onUpdateComments} className='waves-effect waves-light btn news-item-page-btn'>Обновить комментарии</button>
			</section>
			<section>
				{pageLoader ? <Loader /> : <FullNewsItemCard newsItemID={newsItemID} />}
			</section>
		</main>
	)
};

export default NewsItemPage;