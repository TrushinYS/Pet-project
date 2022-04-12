import { FC, Fragment, useState } from 'react';
import {FaRegComments} from 'react-icons/fa'
import {RootCommentItemProps} from '@Redux/types/Newstypes';

const RootCommentItem: FC<RootCommentItemProps> = ({rootComment}) => {
	const [subcomment, SetSubcomment] = useState<boolean>(false);

	const onOpenSubComment = () => {
		SetSubcomment(!subcomment)
	};

	return (
		<Fragment>
			<hr/>
			<p className = 'white-text' >{rootComment.text || 'Текст комментария'}</p>
			<p className = 'yellow-text'>Автор: {rootComment.by || 'Неизвестен'} | Дата: {rootComment.time || 'Неизвестна'} | <span onClick = {onOpenSubComment}><FaRegComments/> : {rootComment.kids ? rootComment.kids.length : 0}</span></p>
			{rootComment.kids && subcomment
				&& (
					<div className = 'news-item-page-subcomment'>
						{rootComment.kids.map(comment => <RootCommentItem key = {comment.id} rootComment = {comment}/>)}
					</div>
				)
			}
		</Fragment>
	)
};

export default RootCommentItem;