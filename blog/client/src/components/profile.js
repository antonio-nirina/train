import React from 'react';
import {connect} from 'react-redux';

import Header from './header';
import Footer from './footer';
import {profileHandler} from "../actions/userAction"

class Profile extends React.Component {
	componentDidMount() {
    	this.props.profileHandler()
    }
	render() {
		return(
			<div className="init">
				<Header />
				<div className="content">
					<p>Profile</p>
				</div>
				<Footer />
			</div>
		)
	}
}

function mapStateToProps(state) {
	let profile = state.user.profils;

	let _st = '';
	let list = '';

	if (profile) {
		_st = profile.code !== 200 ? profile.message : '';
		list = profile.data
	}

	return {
		init:list 
	}
}

  /*const onSend = (event) => {
  	console.log(event.target.value)
  }*/
export default connect(mapStateToProps,{profileHandler})(Profile);