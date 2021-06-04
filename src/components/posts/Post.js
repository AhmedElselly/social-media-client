import React, {Component} from 'react';
import {getPost, like, unlike, removePost, createComment} from './apiPost';
import {isAuthenticated} from '../users/apiUser';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button} from '@material-ui/core';
import {Link, Redirect} from 'react-router-dom';
import Comment from './Comment';


class Post extends Component{
	constructor(props){
		super(props);
		this.state = {
			id: '',
			title: '',
			description: '',
			userId: '',
			username: '',
			like: '',
			likes: '',
			comments: [
				{_id: '', text: '', author: {id: '', username: ''}}
			],
			text: '',
			deleted: false
		}

		this.checkLike = this.checkLike.bind(this);
		this.clickLike = this.clickLike.bind(this);
		this.commentSubmit = this.commentSubmit.bind(this);
		this.handleCommentChange = this.handleCommentChange.bind(this);
		this.renderComments = this.renderComments.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
	}

	componentDidMount(){
		const {postId} = this.props.match.params;
		getPost(postId).then(res => {
			this.setState({id: res.data._id, comments: res.data.comments, like: this.checkLike(res.data.likes), likes: res.data.likes.length, description: res.data.description, title: res.data.title, username: res.data.author.username, userId: res.data.author.id});
		});
	}

	checkLike(likes){
		const {_id} = isAuthenticated().user;
		let match = likes.indexOf(_id) !== -1;
		return match;
	}

	clickLike(){
		let callApi = this.state.like ? unlike : like;
		const {_id} = isAuthenticated().user;
		const {token} = isAuthenticated();
		const {postId} = this.props.match.params;

		callApi(_id, token, postId).then(res => {
			this.setState({like: !this.state.like, likes: res.data.likes.length});
		})
	}

	handleCommentChange(e){
		this.setState({text: e.target.value})
	}

	commentSubmit(e){
		e.preventDefault();
		const {_id} = isAuthenticated().user;
		const {token} = isAuthenticated();
		const {postId} = this.props.match.params;

		createComment(_id, token, postId, this.state.text).then(res => {
			console.log(res.data)
			this.setState({...this.state, comments: res.data.comments})
		})
	}

	renderComments(){
		const comments = this.state.comments.map(comment => {
			return(
				<Comment text={comment.text} authorId={comment.author._id} username={comment.author.username} id={comment._id} />
			)
		})
		return comments;
	}

	handleRemove(e){
		const {postId} = this.props.match.params;
		const {_id} = isAuthenticated().user;
		const {token} = isAuthenticated();

		removePost(_id, postId, token).then(res => {
			console.log(res.data);
			this.setState({deleted: true});
		})
	}



	render(){
		const {id, deleted, title, description, username, like, userId, comments} = this.state;
		if(deleted) {
			return <Redirect to='/' />
		}
		console.log(comments)
		return(
			<div className='container'>
				<div className="card mb-3">
				  <img src={`http://localhost:8000/posts/image/${id}`} className="card-img-top" alt="..."/>
				  <div className="card-body">
				    <h5 className="card-title">{title}</h5>
				    <p className="card-text">{description}</p>
				    <p className="card-text"><small className="text-muted">{username}</small></p>
				    {isAuthenticated() && isAuthenticated().user._id === userId && (
				    	<div>
				    	<Link className='mr-2' to={`/post/${id}/edit`}>
				    		<Button variant="outlined" color="secondary">Edit</Button>	
				    	</Link>
				    	<Button variant="contained" onClick={this.handleRemove} color="secondary">Delete</Button>
				    	</div>
				    	)}
				    <div>
				    	{this.state.like ? (
				    		<svg xmlns="http://www.w3.org/2000/svg" onClick={this.clickLike} width="16" height="16" fill="#E91E63" style={{cursor: 'pointer'}} className="bi bi-heart-fill" viewBox="0 0 16 16">
							  	<path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
								</svg>
								) : (
								<svg xmlns="http://www.w3.org/2000/svg" onClick={this.clickLike} width="16" height="16" fill="currentColor" style={{cursor: 'pointer'}} className="bi bi-heart" viewBox="0 0 16 16">
								  <path fillRule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
								</svg>
								)}
				    	{this.state.likes} {this.state.likes === 1 ? ('like'): ('likes')}
				    </div>
				  </div>
				</div>
				<div className='mt-5'>
					<form className={'none'} noValidate autoComplete="off">
			      {/*<TextField id="standard-basic" label="Comment" />*/}
			      <TextField
	          id="standard-full-width"
	          label=""
	          style={{ margin: 8 }}
	          placeholder="Comment"
	          helperText=""
	          fullWidth
	          margin="normal"
	          name='text'
	          value={this.state.text}
	          onChange={this.handleCommentChange}
	          InputLabelProps={{
	            shrink: true,
	          }}
	        />
	        <Button onClick={this.commentSubmit} variant="contained" color="primary">
					  Comment
					</Button>
			    </form>
		    </div>

		    <div>
		    	{this.renderComments()}
		    </div>
			</div>
		)
	}
}

export default Post;