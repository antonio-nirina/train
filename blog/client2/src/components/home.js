import React from 'react';
import {connect} from 'react-redux';
// import {Link} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


import Header from './header';
import Footer from './footer';
import {listPost,createPost,getNotificationPost} from "../actions/userAction";
import Tools from "../utils/tools";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

class Home extends React.Component {

	constructor(props) {
    	super(props);
    	this.state = {
    		visible:false,
    		content:"",
    		title:"",
    		notif:0
    	}
    	this.createPost = this.createPost.bind(this);
    	this.sendPost = this.sendPost.bind(this);
    	this.changeContent = this.changeContent.bind(this);
    	this.changeTitle= this.changeTitle.bind(this);

    }

    componentDidMount() {
    	Tools.onSendSocket()
    	this.props.listPost()
    }

    componentDidUpdate(prev){
		this.props.getNotificationPost()    	
    }

    createPost(){
    	this.setState({visible:true})
    	Tools.onCreatePost()
    }
    sendPost(){
    	this.setState({visible:false})
    	const content = this.state.content;
    	const title = this.state.title;
    	const obj = {
    		"content":content,
    		"title":title
    	}
		
    	if (title && content) {
    		Tools.onCreatePost(obj)	
    	}
    }

    changeContent(e){
    	this.setState({content:e.target.value})
    }
    changeTitle(e){
    	this.setState({title:e.target.value})
    }

  	render() {
  		return (
  			<div>
  				{/*eslint-disable */}
  			<Header />
  			<Button variant="contained" style={this.state.visible ? {"display":"none"} : {"display":"inherit"}} onClick={this.createPost}>Publiez</Button>
  			<div className="create" style={!this.state.visible ? {"display":"none"} : {"display":"inherit"}} >
  				<div>
			  	<label>
			    Title :
			    	<input onChange={this.changeTitle} type="text" name="name" />
			    	<TextField id="outlined-basic" onChange={this.changeTitle} label="Title" variant="outlined" />
			  </label>
			  </div>
			  <div>
			  <label>
			    Contenu :
			    	<textarea onChange={this.changeContent} />
			  </label>
			  <Button variant="contained" style={!this.state.visible ? {"display":"none"} : {"display":"inherit"}} onClick={this.sendPost}>Publiez</Button>
			  </div>
  			</div>

  			{this.props.init ? this.props.init.map((e,i) => {
  					return(
  						<List className={useStyles.root} key={i}>
			      			<ListItem alignItems="flex-start">
						        <ListItemAvatar>
						          <Avatar alt="Remy Sharp" src={require('../assets/image/bus-lite.jpg')} />
						        </ListItemAvatar>
					        	<ListItemText
					          		primary={e.title ? e.title : ""}
					          		secondary={
						            <React.Fragment>
						              <Typography
						                component="span"
						                variant="body2"
						                className={useStyles.inline}
						                color="textPrimary"
						              >
						                {e.user ? e.user.firstName +" "+ e.user.lastName  : e.authorName}
						              </Typography>
						              {"— "+e.content}
						            </React.Fragment>
					          		}
					        	/>
				      		</ListItem>
			      		<Divider variant="inset" component="li" />
		    		</List>)	
  			}) : null}
        	<Footer />
  			</div>
  		)
  	}

}

function mapStateToProps(state, ownProps) {
	let posts = state.user.listPost;
	let _st = '';
	let list = '';

	if (posts) {
		_st = posts.code !== 200 ? posts.message : '';
		list = posts.data.filter((e,i) => {
			return i < 5;
		})
	}

	return {
		params: ownProps,
		init:list,
	}
}

export default connect(mapStateToProps,{listPost,createPost,getNotificationPost})(Home);