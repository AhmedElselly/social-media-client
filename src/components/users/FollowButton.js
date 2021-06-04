import React, {Component} from 'react';
import {followRequest, unfollowRequest} from './apiUser';

class FollowButton extends Component{
	constructor(props){
		super(props);
		this.followClick = this.followClick.bind(this);
		this.unfollowClick = this.unfollowClick.bind(this);
	}

	followClick(){
		this.props.onButtonClick(followRequest)
		console.log('follow')
	}

	unfollowClick(){
		this.props.onButtonClick(unfollowRequest)
		console.log('unfollow')
	}

	render(){
		const {following} = this.props;
		return(
			<div>
				{following ? (
					<button className='btn btn-md btn-warning' onClick={this.unfollowClick}>Unfollow</button>
				):(
					<button className='btn btn-md btn-success' onClick={this.followClick}>follow</button>
				)}
			</div>
		)
	}
}

export default FollowButton;