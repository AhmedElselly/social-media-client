import React, {Component} from 'react';
import {postNew} from './apiPost';
import {isAuthenticated} from '../users/apiUser';

class PostForm extends Component{
	constructor(props){
		super(props);
		this.state = {
			title: '',
			description: '',
			image: null
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e){
		const value = e.target.name === 'image' ? e.target.files[0] : e.target.value;
		this.setState({[e.target.name]: value})
	}

	handleSubmit(e){
		e.preventDefault();
		const {_id} = isAuthenticated().user;
		const {token} = isAuthenticated();
		const formData = new FormData();
		const {title, description, image} = this.state;
		formData.append('title', title);
		formData.append('description', description);
		formData.append('image', image);
		console.log(formData)
		postNew(_id, token, formData).then(res => {
			console.log(res.data);
		})
	}

	render(){
		return(
			<div className='container'>
			<form onSubmit={this.handleSubmit} className='container'>
			  <div className="form-group">
			    <label for="exampleInputEmail1">Title</label>
			    <input type="text" name='title' value={this.state.title} onChange={this.handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
			  </div>
			  <div className="form-group">
			    <label for="exampleInputEmail1">Description</label>
			    <input type="text" name='description' value={this.state.description} onChange={this.handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
			  </div>
			  <div className="form-group">
			    <label for="exampleInputEmail1">File</label>
			    <input type="file" accept='image/*' name='image' onChange={this.handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
			  </div>
			  
			  
			  <button type="submit" class="btn btn-primary">Submit</button>
			</form>
			</div>
		)
	}
}

export default PostForm;