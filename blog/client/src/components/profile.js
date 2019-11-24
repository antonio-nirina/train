import React from 'react';
import {connect} from 'react-redux';

import Header from './header';
import Footer from './footer';
import {profileHandler} from "../actions/userAction"

const ListPost = ({data}) => {
	return (
		<div>
			{data && data.length >= 5 ? 
			(
				<div>
					<div className="row">
						<div className="col-12 col-sm-6 box">
							<p>{((new Date(data[0].time)).getDate())+"/"+((new Date(data[0].time)).getMonth()+1)+"/"+((new Date(data[0].time)).getFullYear())}</p>
							<p>{data[0].content}</p>
						</div>
						<div className="col-12 col-sm-6 box">
							<p>{((new Date(data[1].time)).getDate())+"/"+((new Date(data[1].time)).getMonth()+1)+"/"+((new Date(data[1].time)).getFullYear())}</p>
							<p>{data[1].content}</p>
						</div>
					</div>
					<div className="row">
						<div className="col-12 col-sm-6 box">
							<p>{((new Date(data[2].time)).getDate())+"/"+((new Date(data[2].time)).getMonth()+1)+"/"+((new Date(data[2].time)).getFullYear())}</p>
							<p>{data[2].content}</p>
						</div>
						<div className="col-12 col-sm-6 box">
							<p>{((new Date(data[3].time)).getDate())+"/"+((new Date(data[3].time)).getMonth()+1)+"/"+((new Date(data[3].time)).getFullYear())}</p>
							<p>{data[3].content}</p>
						</div>
					</div>
					<div className="row">
						<div className="col-12 col-sm-6 box">
							<p>{((new Date(data[4].time)).getDate())+"/"+((new Date(data[4].time)).getMonth()+1)+"/"+((new Date(data[4].time)).getFullYear())}</p>
							<p>{data[4].content}</p>
						</div>
						<div className="col-12 col-sm-6 box">
							<p>{((new Date(data[5].time)).getDate())+"/"+((new Date(data[5].time)).getMonth()+1)+"/"+((new Date(data[5].time)).getFullYear())}</p>
							<p>{data[5].content}</p>
						</div>
					</div>
				</div>
			) : (
				<div>
					{data && data.length === 4 ? (
						<div>
							<div className="row">
								<div className="col-12 col-sm-6 box">
									<p>{((new Date(data[0].time)).getDate())+"/"+((new Date(data[0].time)).getMonth()+1)+"/"+((new Date(data[0].time)).getFullYear())}</p>
									<p>{this.props.init.post[0].content}</p>
								</div>
								<div className="col-12 col-sm-6">
									<p>{((new Date(data[1].time)).getDate())+"/"+((new Date(data[1].time)).getMonth()+1)+"/"+((new Date(data[1].time)).getFullYear())}</p>
									<p>{data[1].content}</p>
								</div>
							</div>
							<div className="row">
								<div className="col-12 col-sm-6 box">
									<p>{((new Date(data[2].time)).getDate())+"/"+((new Date(data[2].time)).getMonth()+1)+"/"+((new Date(data[2].time)).getFullYear())}</p>
									<p>{data[2].content}</p>
								</div>
								<div className="col-12 col-sm-6 box">
									<p>{((new Date(data[3].time)).getDate())+"/"+((new Date(data[3].time)).getMonth()+1)+"/"+((new Date(data[3].time)).getFullYear())}</p>
									<p>{data[3].content}</p>
								</div>
							</div>
					</div>
					) : (
					<div>{data && data.length === 3 ? (
						<div>
							<div className="row">
								<div className="col-12 col-sm-6 box">
									<p>{((new Date(data[0].time)).getDate())+"/"+((new Date(data[0].time)).getMonth()+1)+"/"+((new Date(data[0].time)).getFullYear())}</p>
									<p>{data[0].content}</p>
								</div>
								<div className="col-12 col-sm-6 box">
									<p>{((new Date(data[1].time)).getDate())+"/"+((new Date(data[1].time)).getMonth()+1)+"/"+((new Date(data[1].time)).getFullYear())}</p>
									<p>{data[1].content}</p>
								</div>
							</div>
							<div className="row">
								<div className="col-12 col-sm-6 box">
									<p>{((new Date(data[2].time)).getDate())+"/"+((new Date(data[2].time)).getMonth()+1)+"/"+((new Date(data[2].time)).getFullYear())}</p>
									<p>{data[2].content}</p>
								</div>
							</div>
						</div>
						) : (
						<div>{data && data.length === 2 ? (
								<div>
									<div className="row">
										<div className="col-12 col-sm-6 box">
											<p>{((new Date(data[0].time)).getDate())+"/"+((new Date(data[0].time)).getMonth()+1)+"/"+((new Date(data[0].time)).getFullYear())}</p>
											<p>{data[0].content}</p>
										</div>
										<div className="col-12 col-sm-6 box">
											<p>{((new Date(data[1].time)).getDate())+"/"+((new Date(data[1].time)).getMonth()+1)+"/"+((new Date(data[1].time)).getFullYear())}</p>
											<p>{data[1].content}</p>
										</div>
									</div>
								</div>
							) : (
							<div>
								<div className="row">
									<div className="col-12 col-sm-6 box">
										<p>{data ? ((new Date(data[0].time)).getDate())+"/"+((new Date(data[0].time)).getMonth()+1)+"/"+((new Date(data[0].time)).getFullYear()) : null}</p>
										<p>{data ? data[0].content : null}</p>
									</div>
								</div>
						</div>
						)}
					</div>
					)}
				</div>
				)}
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
				<div className="row content">
					<div className="col-sm-4 profil box">
						<div className="avatar">
							<img src={this.props.init.avatar ? this.props.init.avatar : require('../assets/image/user.png')} style={{"width":"25%"}} />
						</div>
						<div className="info">
							<p>{this.props.init.email}</p>
							<p>
							<span>{this.props.init.firstName}</span><span style={{"marginLeft":"12px"}}>{this.props.init.lastName}</span>
							</p>
						</div>
					</div>
					<div className="col-sm-6 post">
						<ListPost data={this.props.init.post}/>
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