import React, { useState } from "react";
import {FaRegComments} from 'react-icons/fa'

export default function RootCommentItem({rootComment}) {

	const [subcomment, SetSubcomment] = useState(false)
	const onOpenSubComment = () => {
		SetSubcomment(!subcomment)
	}

	return (
		<React.Fragment>
			<hr/>
			<p className="white-text" >{rootComment.text || "Текст комментария"}</p>
			<p className="yellow-text">Автор: {rootComment.by || "Неизвестен"} | Дата: {rootComment.time || "Неизвестна"} | <span onClick={onOpenSubComment}><FaRegComments/> : {rootComment.kids ? rootComment.kids.length : 0}</span></p>
			{rootComment.kids && subcomment
				&& (
					<div className="news-item-page-subcomment">
						{rootComment.kids.map(comment => (comment.deleted || comment.dead) ? undefined : <RootCommentItem key = {comment.id} rootComment = {comment}/>)}
					</div>
				)
			}
		</React.Fragment>
		
	)
}