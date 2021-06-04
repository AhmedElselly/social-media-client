import React, {Component} from 'react';
import {isAuthenticated, userById} from './apiUser';
import {Link} from 'react-router-dom';

class Profile extends Component{
	constructor(props){
		super(props);
		this.state = {
			id: '',
			fullName: '',
			about: '',
			following: false
		}
	}
	componentDidMount(){
		const {_id} = isAuthenticated().user;
		userById(_id).then(res => {
			console.log(res.data)
			this.setState({id: res.data._id, fullName: res.data.fullName, about: res.data.about});
		})
	}
	render(){
		const {_id} = isAuthenticated().user;
		const {fullName, about} = this.state;
		return(
			<div className='container mt-4'>
				<div className='row'>
					<div className='col-8'>
						<img width='200' height='200' className='mb-5' style={{objectFit: 'cover'}} src={`http://localhost:8000/user/${_id}/image`} alt={fullName}/>
						<h4>{fullName}</h4>
					</div>
					<div className='col-4'>
						<Link className='btn btn-md btn-primary' to={`/user/profile/${_id}/edit`}>Edit Profile</Link>
						<div className='mt-5'>
							<h5>About Me</h5>
							{about}
						</div>
					</div>
				</div>
				
			</div>
		)
	}
}

export default Profile;