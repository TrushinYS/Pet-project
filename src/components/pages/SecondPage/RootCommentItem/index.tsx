import { FC, Fragment, useState } from 'react';
import { FaRegComments } from 'react-icons/fa'
import { RootCommentItemProps } from '@Redux/types/newsTypes';

const RootCommentItem:FC<RootCommentItemProps> = ( {rootComment} ) => {
	const [subcomment, SetSubcomment] = useState<boolean>(false);

	const onOpenSubComment = () => {
		SetSubcomment(!subcomment)
	};

	const createMarkup = () => {
		return {
			__html: rootComment.text || 'Текст отсутствует',
		}
	}

	return (
		<Fragment>
			<hr/>
			<p className = 'white-text' dangerouslySetInnerHTML = {createMarkup()}></p>
			<p className = 'yellow-text'>Автор: {rootComment.by || 'Неизвестен'} | Дата: {rootComment.time || 'Неизвестна'} | <span onClick = {onOpenSubComment}><FaRegComments className = {rootComment.kids ? 'cursor' : '' }/> : {rootComment.kids ? rootComment.kids.length : 0}</span></p>
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