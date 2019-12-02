import React from 'react';
import {connect} from 'react-redux';

import Header from './header';
import Footer from './footer';
import {profileHandler,updateAvatar} from "../actions/userAction"

const ListPost = ({data}) => {
	let array = []
	if (data && data.length >= 5) {
		data.map((el,i) => {
			if (i <= 5) {
				array.push(el)
			}
		})
	} else  {
		array = data ? data : []
	}
	return (
		<div className="row">
			{array.length > 0 ? 
				(array.map((el,i) => {
					return(
						<div className="col-12 col-sm-6 box" key={el._id}>
								<p>{"Commentaire "+((new Date(el.time)).getDate())+"/"+((new Date(el.time)).getMonth()+1)+"/"+((new Date(el.time)).getFullYear())}</p>
								<p>{el.content}</p>
						</div>
					)
				})) : 
				(null) 
			}
		</div>
	)
}

class Profile extends React.Component {
	constructor(props) {
	  super(props);
	   	this.state ={
      		file:null,
      		visible:false
    	}
	  this.changProfil = this.changProfil.bind(this)
	  this.onChange = this.onChange.bind(this)
	}
	componentDidMount() {
    	this.props.profileHandler()
    }
    changProfil(e) {
    	this.setState({visible:true})
    }

    onChange(e) {
    	let reader = new FileReader();
    	const file = e.target.files[0];
    	reader.readAsDataURL(file);
    	// this.setState({file:e.target.files[0]})
    	console.log('sssss',reader.result)
    }
	render() {
		return(
			<div className="init">
				<Header />
				<div className="row content">
					<div className="col-sm-4 profil box">
						<div className="avatar">
							<img src={this.props.init.avatar ? this.props.init.avatar : require('../assets/image/user.png')} style={{"width":"25%"}} onClick={this.changProfil}/>
							<input className={this.state.visible ? "profil" : "d-none"} type="file" onChange={this.onChange}  />
						</div>
						<div className="info">
							<p>{this.props.init.email}</p>
							<p>
							<span>{this.props.init.firstName}</span><span style={{"marginLeft":"12px"}}>{this.props.init.lastName}</span>
							</p>
							<button className="edit">Edit profil</button>
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
export default connect(mapStateToProps,{profileHandler,updateAvatar})(Profile);