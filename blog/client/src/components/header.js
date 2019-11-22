import React  from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {signoutUser} from '../actions/logAction';

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
	      scrollPositionY: 0
	    }
  	}

	componentDidMount() {
    	window.addEventListener('scroll', debounce(this.handleScroll, 32))
  	}

  	componentWillUnmount() {
    	window.removeEventListener('scroll', debounce(this.handleScroll, 32))
  	}

  	handleScroll = () => {
    	const scrollPositionY = +window.scrollY
    	return this.setState({ scrollPositionY })
  	}

	render() {	
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
				        <span className="nav-link active"><Link style={{"textDecoration": "none","fontSize":"15px","paddingRight":".5rem","paddingLeft":".5rem"}} to="/contact" title="contact">Contact</Link></span>
				      </li>
				      {
				      	this.props.isConnected ? 
				      	(<li className="nav-item dropdown">
					        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					          <img style={{"width":"36px"}} src={require('../assets/image/user.png')} />
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
	let init = ''

	if (a_status) {
		init = a_status ? true : ""
	}

	return {
		isConnected: init ? true : false,
	}
}

export default connect(mapStateToProps,{signoutUser})(Header);
