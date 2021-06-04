import React, {Component} from 'react';
import {login, authenticate, isAuthenticated} from './apiUser';

class Login extends Component{
	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(e){
		e.preventDefault();
		const {email, password} = this.state;
		login(email, password).then(res => {
			console.log(res.data);
			authenticate(res.data, () => {
				console.log('TOKEN', res.data.token)
				this.props.history.push('/');
			})
		})
	}

	handleChange(e){
		this.setState({[e.target.name]: e.target.value});
	}
	render(){
		const {email, password} = this.state;
		return(
			<div className='container'>
				<form onSubmit={this.handleSubmit}>
				  <div className="form-group">
				    <label htmlFor="exampleInputEmail1">Email address</label>
				    <input type="email" name='email' value={email} onChange={this.handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
				  </div>
				  <div className="form-group">
				    <label for="exampleInputPassword1">Password</label>
				    <input type="password" name='password' value={password} onChange={this.handleChange} className="form-control" id="exampleInputPassword1"/>
				  </div>
				  <button type="submit" className="btn btn-primary">Submit</button>
				</form>
			</div>
		)
	}
}

export default Login;