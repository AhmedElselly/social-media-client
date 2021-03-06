import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {isAuthenticated} from './users/apiUser';

const Menu = () => {
	return(
		<div>
			<nav className="navbar bg-nav navbar-expand-lg navbar-light bg-light">
			  <Link className="navbar-brand" to="/">Navbar</Link>
			  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			    <span className="navbar-toggler-icon"></span>
			  </button>

			  <div className="collapse navbar-collapse" id="navbarSupportedContent">
			    <ul className="navbar-nav mr-auto">
			      <li className="nav-item active">
			        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
			      </li>
			      <li className="nav-item active">
			        <Link className="nav-link" to="/users">Users <span className="sr-only">(current)</span></Link>
			      </li>
			      {isAuthenticated() && (
			      	<div>
			      	<li className="nav-item">
			        	<Link className="nav-link" to={`/user/profile/${isAuthenticated().user._id}`}>Profile</Link>
			      	</li>
			      	<li className="nav-item">
			        	<Link className="nav-link" to={`/post/new`}>Make New Post</Link>
			      	</li>
			      	</div>
			      	)}
			      {!isAuthenticated() && (
			      	<div>
			      	<li className="nav-item">
				        <Link className="nav-link" to="/login">Login</Link>
				      </li>
				      <li className="nav-item">
				        <Link className="nav-link" to="/register">Register</Link>
				      </li>
				      </div>
			      	)}
			      
			      <li className="nav-item dropdown">
			        <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			          Dropdown
			        </Link>
			        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
			          <Link className="dropdown-item" to="#">Action</Link>
			          <Link className="dropdown-item" to="#">Another action</Link>
			          <div className="dropdown-divider"></div>
			          <Link className="dropdown-item" to="#">Something else here</Link>
			        </div>
			      </li>
			      <li className="nav-item">
			        <Link className="nav-link disabled" to="#" tabIndex="-1" aria-disabled="true">Disabled</Link>
			      </li>
			    </ul>
			  </div>
			</nav>
		</div>
	)
}

export default withRouter(Menu);