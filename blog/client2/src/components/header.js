import React  from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import {signoutUser} from '../actions/logAction';
import {profileHandler} from "../actions/userAction";
import "../assets/style/header.css";

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



const debounce = (func, wait) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

class Header extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      scrollPositionY: 0,
		  open:false,
		  numberNotif:0
	    }
	    this.handleToggle = this.handleToggle.bind(this)
  	}

	componentDidMount() {
		window.addEventListener('scroll', debounce(this.handleScroll, 32));
		this.props.profileHandler();
  	}

  	componentWillUnmount() {
    	window.removeEventListener('scroll', debounce(this.handleScroll, 32))
  	}

  	handleScroll = () => {
    	const scrollPositionY = +window.scrollY
    	return this.setState({ scrollPositionY })
  	}

  	handleToggle(){
  		console.log("eeee")
  	}

	render() {
		let arr = []
		arr.push(this.props.notification)
		console.log(arr)
		return(
			<nav className={(!!this.state.scrollPositionY) ? 'navbar navbar-expand-lg navbar-light bg-light isScrolling' : 'navbar navbar-expand-lg navbar-light bg-light'}  style={{'marginBottom':'26px'}}>
			 {/*eslint-disable */}
			 <a className="navbar-brand" href="#"><img alt="logo" src={require("../assets/image/logo192.png")} style={{'width':'20%'}} /></a>
			  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			   <span className="navbar-toggler-icon"></span>
			  </button>
			  <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{"position": "absolute","left": "790px"}}>
				    <ul className="navbar-nav mr-auto">
				      <li className="nav-item active">
				        <span className="nav-link"><Link style={{"textDecoration": "none","fontSize":"15px","paddingRight":".5rem","paddingLeft":".5rem"}} to="/" title="home">Acceuil</Link></span>
				      </li>
				      <li className="nav-item">
				        <span className="nav-link"><Link style={{"textDecoration": "none","fontSize":"15px","paddingRight":".5rem","paddingLeft":".5rem"}} to="/init" title="initial react">Init</Link></span>
				      </li>
				      <li className="nav-item">
				        <span className="nav-link"><Link style={{"textDecoration": "none","fontSize":"15px","paddingRight":".5rem","paddingLeft":".5rem"}} to="/dashboard" title="dashboard">Dashboard</Link></span>
				      </li>
				      <li className="nav-item">
				        <div className="nav-link active dropdown" tyle={{"textDecoration": "none","fontSize":"17px","paddingRight":".5rem","paddingLeft":".5rem" }}  title="contact">
							<i className={arr[0] ? "fa fa-bell-o dropdown-toggle notif":"fa fa-bell-o dropdown-toggle"}
							onClick={this.handleToggle} 
							aria-hidden="true"
							id="dropdownMenuButton" 
							data-toggle="dropdown" 
							aria-haspopup="true" 
							aria-expanded="false"
							style={{"color":"#007bff"}} 
							></i>
							<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
								{
									arr[0] ? arr.map((e,i) => {
										return(
											<Link to="/" className="dropdown-item" >Action</Link>
										)
									}) : (<a className="dropdown-item" ></a>)
								}
							</div>
						</div>
				      </li>
				      {
				      	this.props.isConnected ? 
				      	(<li className="nav-item dropdown">
					        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					          <img style={{"width":"23px","borderRadius":"102px"}} src={this.props.profil ? this.props.profil.avatar : require('../assets/image/user.png')} />
					        </a>
					        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
					          <span className="dropdown-item" >
					          	<Link to="/dashboard">Dashboard</Link>
					          </span>
					          <span className="dropdown-item" >
					          	<Link to="/profile" >Profile</Link>
					          </span>
					          <span className="dropdown-item bt btBlue dec" onClick={this.props.signoutUser}>
					          	Déconnexion
					          </span>
					        </div>
				      </li>
				      ) 
				      	: 
				      	(<button className="btn btn-success" style={{"height": "38px","position": "relative","top": "3px","borderRadius":"50px"}}>
				      		<Link to="/signin" style={{"textDecoration": "none","fontSize":"15px","paddingRight":".5rem","paddingLeft":".5rem","color":"#ffff"}}>Se connecter</Link>
				      	</button>)
				      }
				      
				    </ul>
			  </div>
			</nav>
		)
	}
}

function mapStateToProps(state) {
	let a_status = state.login.authenticated;
	let profile = state.user.profils;
	let notif = state.user.notif;
// console.log("xxxx_notif", notif)
	let init = ''
	let list = "";

	if (a_status) {
		init = a_status ? true : ""
	}

	if (profile) {
		list = profile.code == 200 ? profile.data : ""
	}

	return {
		isConnected: init ? true : false,
		profil:list,
		notification:notif ? notif : "" 
	}
}

export default connect(mapStateToProps,{signoutUser,profileHandler})(Header);
