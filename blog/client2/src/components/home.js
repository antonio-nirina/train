import React from 'react';
import {connect} from 'react-redux';
// import {Link} from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import {listPost,createPost} from "../actions/userAction";
import Tools from "../utils/tools";

class Home extends React.Component {

	constructor(props) {
    	super(props);
    	this.state = {}
    }

    componentDidMount() {
    	Tools.onSendSocket()
    	this.props.listPost()
    }

  	render() {
  		return (
  			<div>
  				{/*eslint-disable */}
  				<Header />
	  				ppp
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
		list = posts.data
	}

	return {
		params: ownProps,
		init:list 
	}
}

export default connect(mapStateToProps,{listPost,createPost})(Home);