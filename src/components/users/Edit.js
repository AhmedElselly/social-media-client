import React, {Component} from 'react';
import {updateUser, isAuthenticated, userById} from './apiUser';
import {Redirect} from 'react-router-dom';

class EditProfile extends Component{
	constructor(props){
		super(props);
		this.state = {
			email: '',
			firstName: '',
			lastName:'',
			about: '',
			image: null,
			password: '',
			loading: false
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount(){
		const {_id} = isAuthenticated().user;

		userById(_id).then(res => {
			console.log(res.data)
			const {email, firstName, lastName, password, about} = res.data;
			this.setState({email, firstName, lastName, password, about});
		})
	}

	handleSubmit(e){
		e.preventDefault();
		const {_id} = isAuthenticated().user;
		const {token} = isAuthenticated();
		const {email, firstName, lastName, password, about, image} = this.state;
		const formData = new FormData();
		formData.append('image', image);
		formData.append('email', email);
		formData.append('firstName', firstName);
		formData.append('lastName', lastName);
		formData.append('password', password);
		formData.append('about', about);
		updateUser(_id, formData, token).then(res => {
			console.log(res);
			this.setState({loading: true});
		});
	}

	handleChange(e){
		const value = e.target.name === 'image' ? e.target.files[0] : e.target.value;
		this.setState({[e.target.name]: value});
	}

	render(){
		const {email, firstName, lastName, password, about, image, loading} = this.state;
		const {_id} = isAuthenticated().user;

		// if(loading){
		// 	return <Redirect to={`/user/profile/${_id}`} />
		// }

		return(
			<div className='container'>
				<form onSubmit={this.handleSubmit}>

				  <div className="form-group">
				    <label htmlFor="exampleInputEmail1">Email address</label>
				    <input type="email" name='email' value={email} onChange={this.handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
				  </div>
				  <div className='row'>
					  <div className="form-group ml-3">
					    <label htmlFor="exampleInputEmail1">First Name</label>
					    <input type="text" name='firstName' value={firstName} onChange={this.handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
					  </div>
					  <div className="form-group ml-3">
					    <label htmlFor="exampleInputEmail1">Last Name</label>
					    <input type="text" name='lastName' value={lastName} onChange={this.handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
					  </div>
				  </div>

				  <div className='form-group'>
				    <label htmlFor="exampleInputEmail1" >Avatar</label>
				  	<input type='file' accept='image/*' name='image' className='form-control' id="" onChange={this.handleChange}/>
				  </div>
				  <div className='form-group'>
				    <label htmlFor="exampleInputEmail1" >About</label>
				  	<textarea name="about" className='form-control' id="" onChange={this.handleChange} value={about} cols="30" rows="10"></textarea>
				  </div>
				  <div className="form-group">
				    <label htmlFor="exampleInputPassword1">Password</label>
				    <input type="password" name='password' value={password} onChange={this.handleChange} className="form-control" id="exampleInputPassword1"/>
				  </div>
				  <button type="submit" className="btn btn-primary">Submit</button>
				</form>
			</div>
		)
	}
}

export default EditProfile;