import {FC} from "react";
import { useNavigate } from 'react-router-dom'
import {LittleNewsItemCardProps} from '../../../../core/redux/types/Newstypes';

const LittleNewsItemCard: FC<LittleNewsItemCardProps> = ( {news} ) => {
	const navigate= useNavigate();

	const openNewsItemPage = () => {
		navigate('/' + news.id)
	};

	return (
		<article onClick={openNewsItemPage} className="card blue-grey darken-1 hoverable cursor ">
			<div className="card-content white-text ">
				<p className="card-title">{news.title || "Заголовок новости"}</p>
			</div>
			<div className="card-action">
				<span className="orange-text">Рейтинг: {news.score || "Неизвестен"} | Автор: {news.by || "Неизвестен"} | Дата публикации: {news.time || "Неизвестна"} </span>
			</div>
		</article>
		
	)
};

export default LittleNewsItemCard;