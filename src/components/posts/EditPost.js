import React, {Component} from 'react';
import {updatePost, getPost} from './apiPost';
import {isAuthenticated} from '../users/apiUser';

class EditPost extends Component{
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

	componentDidMount(){
		const {postId} = this.props.match.params;
		console.log(postId)
		getPost(postId).then(res => {
			console.log(res.data)
			this.setState({title: res.data.title, description: res.data.description});
		});
	}

	handleChange(e){
		const value = e.target.name === 'image' ? e.target.files[0] : e.target.value;
		this.setState({[e.target.name]: value})
	}

	handleSubmit(e){
		e.preventDefault();
		const {_id} = isAuthenticated().user;
		const {token} = isAuthenticated();
		const {postId} = this.props.match.params;
		const formData = new FormData();
		const {title, description, image} = this.state;
		formData.append('title', title);
		formData.append('description', description);
		formData.append('image', image);
		updatePost(_id, postId, token, formData).then(res => {
			console.log(res.data);
		})
	}

	render(){
		const {title, description} = this.state;
		console.log(title, description)
		return(
			<div className='container'>
			<form onSubmit={this.handleSubmit} className='container'>
			  <div className="form-group">
			    <label for="exampleInputEmail1">Title</label>
			    <input type="text" name='title' value={title} onChange={this.handleChange} className="form-control"/>
			  </div>
			  <div className="form-group">
			    <label for="exampleInputEmail1">Description</label>
			    <input type="text" name='description' value={description} onChange={this.handleChange} className="form-control"/>
			  </div>
			  <div className="form-group">
			    <label for="exampleInputEmail1">File</label>
			    <input type="file" accept='image/*' name='image' onChange={this.handleChange} className="form-control"/>
			  </div>			  
			  <button type="submit" class="btn btn-primary">Submit</button>
			</form>
			</div>
		)
	}
}

export default EditPost;