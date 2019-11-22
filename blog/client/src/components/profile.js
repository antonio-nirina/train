import React from 'react';
import {connect} from 'react-redux';

import Header from './header';
import Footer from './footer';
import {profileHandler} from "../actions/userAction"

const ListPost = ({post}) => {

	return (
		<div>
		{post.length >= 5 ? 
			(
			<div>
				<div className="row">
					<div className="col-sm-6">
						<p>{this.props.init.post[0].title}</p>
						<p>{this.props.init.post[0].content}</p>
					</div>
					<div className="col-sm-6">
						<p>{this.props.init.post[1].title}</p>
						<p>{this.props.init.post[1].content}</p>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-6">
						<p>{this.props.init.post[2].title}</p>
						<p>{this.props.init.post[2].content}</p>
					</div>
					<div className="col-sm-6">
						<p>{this.props.init.post[3].title}</p>
						<p>{this.props.init.post[3].content}</p>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-6">
						<p>{this.props.init.post[4].title}</p>
						<p>{this.props.init.post[4].content}</p>
					</div>
					<div className="col-sm-6">
						<p>{this.props.init.post[5].title}</p>
						<p>{this.props.init.post[5].content}</p>
					</div>
				</div>
			</div>
			) : (
			<div>
				{post.length === 4 ? (
					<div>

					</div>
					) 
					:
					(
						<div>
							{post.length === 3 ? (
								<div>
								</div>
								) : 
								(
									<div>
										{
											post.length === 2 ? (
												<div></div>
											) : 
											(<div></div>) 
									}
									</div>
								)
							}
						</div>
					)
				}
			</div>
			) 
		}
			
		</div>
	)
}

class Profile extends React.Component {
	componentDidMount() {
    	this.props.profileHandler()
    }
	render() {
		return(
			<div className="init">
				<Header />
				<div className="content">
					<div className="col-sm-4 profil">
						<div className="avatar">
						</div>
						<div className="info">
							<p>{this.props.init.email}</p>
							<p>
							<span>{this.props.init.firstName}</span><span style={{"marginLeft":"12px"}}>{this.props.init.lastName}</span>
							</p>
						</div>
					</div>
					<div className="col-sm-6 post">
						<ListPost data={this.props.init}/>
					</div>
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