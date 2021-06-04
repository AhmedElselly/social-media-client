import React, {Component} from 'react';
import {register} from './apiUser';

class Register extends Component{
	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			firstName: '',
			lastName: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(e){
		e.preventDefault();
		const {email, password, firstName, lastName} = this.state;
		register(email, password, firstName, lastName).then(res => {
			console.log(res.data);
			
		})
	}

	handleChange(e){
		this.setState({[e.target.name]: e.target.value});
	}
	render(){
		const {email, firstName, lastName, password} = this.state;
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

export default Register;