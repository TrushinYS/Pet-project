import React from "react";
import RootCommentItem from './RootCommentItem'

export default function CommentsList({ newsItem }) {

	if (!newsItem.kids) {
		return <p className="white-text">Комментариии отсутствуют</p>
	}

	return (
		<React.Fragment>
			<p className="yellow-text">Комментарии к посту:</p>
			{newsItem.kids.map((rootComment) => <RootCommentItem key = {rootComment.id} rootComment = {rootComment}/>)}
		</React.Fragment>
	)
}