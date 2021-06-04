import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import {Link} from 'react-router-dom';
import {Avatar, Typography} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

const FollowGrid = (props) => {
  const classes = useStyles();

  console.log(props)
	return(
		<div className={classes.root}>
    <GridList className={classes.gridList} cellHeight={160} cols={4}>
      
      {props.people.map((person, i) => {
				return <GridListTile style={{'height':120, 'width': 120}} key={i}>
				<Link to={"/user/profile/" + person}>
				<Avatar src={'http://localhost:8000/user/'+person+'/image'}
				className={classes.bigAvatar}/>
				<Typography className={classes.tileText}>
				{person.name}
				</Typography>
				</Link>
				</GridListTile>
			})}
      
    </GridList>
  </div>
	)
}

export default FollowGrid;