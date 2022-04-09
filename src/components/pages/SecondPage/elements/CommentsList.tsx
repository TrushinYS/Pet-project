import {FC, Fragment} from "react";
import RootCommentItem from './RootCommentItem';
import {CommentsListProps} from '../../../../core/redux/types/Newstypes';

const CommentsList: FC<CommentsListProps> = ({ newsItem }) => {

	if (!newsItem.kids) {
		return <p className="white-text">Комментариии отсутствуют</p>
	}

	return (
		<Fragment>
			<p className="yellow-text">Комментарии к посту:</p>
			{newsItem.kids.map((rootComment) => <RootCommentItem key = {rootComment.id} rootComment = {rootComment}/>)}
		</Fragment>
	)
}

export default CommentsList