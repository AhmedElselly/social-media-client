import React, {Component} from 'react';
import {allUsers, isAuthenticated} from './apiUser';
import './Users.css';
import {Link} from 'react-router-dom';
import User from './User';

class Users extends Component{
	constructor(props){
		super(props);
		this.state = {
			users: []
		}
	}

	componentDidMount(){
		const {_id} = isAuthenticated().user;
		const {token} = isAuthenticated();
		allUsers(_id, token).then(res => {
			this.setState({users: res.data});
		})
	}
	render(){
		const {users} = this.state;
		const printUsers = users.map(user => {
			console.log(user)
			return(
				<div key={user._id}>
					<h6 className='mr-5 mb-4 inline'>{user.fullName}</h6>
						<Link to={`/users/${user._id}`}>
							<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
							  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
							  <path fillRule="evenodd" d="M4 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5A.5.5 0 0 0 4 8z"/>
							</svg>
						</Link>
				</div>
			)
		})
		return(
			<div className='container box'>
			<h3>All Users</h3>
				{printUsers}
			</div>
		)
	}
}

export default Users;