import React, {Component} from 'react';
import { CardHeader, Avatar } from '@material-ui/core';

class Comment extends Component{
	render(){
		const {authorId, username, text} = this.props
		return(
			<div>
				<CardHeader
					avatar={
						<Avatar src={`http://localhost:8000/user/${authorId}/image`} />
					}
					subheader={username}
					title={text}
				/>
			</div>
		)
	}
}

export default Comment;