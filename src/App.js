import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/posts/Home';
import Login from './components/users/Login';
import Register from './components/users/Register';
import Users from './components/users/Users';
import User from './components/users/User';
import Profile from './components/users/Profile';
import EditProfile from './components/users/Edit';

import Menu from './components/Menu';
import PrivateRoute from './components/PrivateRoute';
import TestPrivate from './components/TestPrivate';

import PostForm from './components/posts/PostForm';
import EditPost from './components/posts/EditPost';
import Post from './components/posts/Post';

function App() {
  return (
    <div className="App">
			<Router>
				<Menu/>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/register' component={Register} />
					<PrivateRoute exact path='/post/new' component={PostForm} />
					<PrivateRoute exact path='/post/:postId' component={Post} />
					<PrivateRoute exact path='/post/:postId/edit' component={EditPost} />
					<PrivateRoute exact path='/users' component={Users} />
					<PrivateRoute exact path='/users/:userId' component={User} />
					<PrivateRoute exact path='/user/profile/:id' component={Profile} />
					<PrivateRoute exact path='/user/profile/:id/edit' component={EditProfile} />
					<PrivateRoute path='/test' component={TestPrivate} />
				</Switch>
			</Router>      
    </div>
  );
}

export default App;
