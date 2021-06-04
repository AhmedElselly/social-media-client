import React, {Component} from 'react';
import {isAuthenticated} from '../users/apiUser';
import {allPosts} from './apiPost';
import {Link} from 'react-router-dom';

class Home extends Component{
	constructor(props){
		super(props);
		this.state = {
			posts: []
		}
	}

	componentDidMount(){
		allPosts().then(res=> {
			this.setState({posts: res.data});
		})
	}
	render(){
		const posts = this.state.posts.map(post => {
			return(
				<div class="card bg-dark mb-5 text-white">
				  <img src={`http://localhost:8000/posts/image/${post._id}`} class="card-img" alt={post.title}/>
				  <div class="card-img-overlay">
				    <h5 class="card-title"><Link to={`/post/${post._id}`} style={{color: 'white'}}>{post.title}</Link></h5>
				    <p class="card-text">{post.description}</p>
					  <p className="card-text"><i><strong><Link to={`/users/${post.author.id}`}>{post.author.username}</Link></strong></i></p>
				  </div>
				</div>
			)
		})
		return(
			<div className='container'>
				<h1>News Feed</h1>
				<div className='row'>
					<div className='col-md-8'>
						{posts}
					</div>
					<div className='col-md-4'>
						users
					</div>
				</div>
			</div>
		)
	}
}

export default Home;