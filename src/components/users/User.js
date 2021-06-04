import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {userById, isAuthenticated, followRequest} from './apiUser';
import FollowButton from './FollowButton';
import FollowGrid from './FollowGrid';


class User extends Component{
	constructor(props){
		super(props);
		this.state = {
			user: {
        following: [],
        followers: []
    	},
			userId: '',
			userFullName: '',
			about: '',
			following: false
		}
		this.clickFollowButton = this.clickFollowButton.bind(this);
		this.checkFollow = this.checkFollow.bind(this);
	}

	componentDidMount(){
		const {userId} = this.props.match.params;
		userById(userId).then(res => {
			console.log(res.data)
			let following = this.checkFollow(res.data);
			this.setState({about: res.data.about, userId: res.data._id, userFullName: res.data.fullName, following, user: {followers: res.data.followers, following: res.data.following}});
		});
	}

	clickFollowButton(apiCall){
		const {_id} = isAuthenticated().user;
		const {token} = isAuthenticated();
		apiCall(_id, token, this.state.userId).then(res => {
			console.log(res.data)
			this.setState({user: res.data, following: !this.state.following});
		})
		// this.setState({following: !this.state.following});
	}

	checkFollow(user){
		const match = user.followers.find(follower => {
			return follower === isAuthenticated().user._id;
		});
		return match;
	}

	render(){
		const {userId, userFullName, about} = this.state;
		console.log(this.state.user)
		return(
			<div className='container mt-4'>
				<div className='row'>
					<div className='col-8'>
						<img width='200' height='200' className='mb-5' style={{objectFit: 'cover'}} src={`http://localhost:8000/user/${userId}/image`} alt={userFullName}/>
						<h4>{userFullName}</h4>
					</div>
					<div className='col-4'>
					{/*isAuthenticated() && isAuthenticated().user._id == this.state.id ? (
						<Link className='btn btn-md btn-primary' to={`/user/profile/${_id}/edit`}>Edit Profile</Link>
						):(
							<FollowButton following={true} />
						)*/}
						{/*<Link className='btn btn-md btn-primary' to={`/user/profile/${_id}/edit`}>Edit Profile</Link>*/}
						<FollowButton following={this.state.following} onButtonClick={this.clickFollowButton} />
						<div className='mt-5'>
							<h5>About Me</h5>
							{about}
						</div>
					</div>
					<FollowGrid people={this.state.user.followers}/>
					<FollowGrid people={this.state.user.following}/>
				</div>
				<hr/>
				
			</div>
		)
	}
}

export default User;