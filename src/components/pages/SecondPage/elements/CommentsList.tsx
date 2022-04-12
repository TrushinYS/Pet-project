import {FC, Fragment} from 'react';
import RootCommentItem from '@Pages/SecondPage/elements/RootCommentItem';
import {CommentsListProps} from '@Redux/types/Newstypes';

const CommentsList: FC<CommentsListProps> = ({ newsItem }) => {

	if (!newsItem.kids || newsItem.kids.length === 0) {
		return <p className = 'white-text'>Комментариии отсутствуют</p>
	};

	return (
		<Fragment>
			<p className = 'yellow-text'>Комментарии к посту:</p>
			{newsItem.kids.map((rootComment) => <RootCommentItem key = {rootComment.id} rootComment = {rootComment}/>)}
		</Fragment>
	)
};

export default CommentsList;