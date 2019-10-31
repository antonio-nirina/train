import React  from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
	return(
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
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
			        <span className="nav-link"><Link style={{"textDecoration": "none","fontSize":"15px","paddingRight":".5rem","paddingLeft":".5rem"}} to="/init" title="contact">Init</Link></span>
			      </li>
			      <li className="nav-item">
			        <span className="nav-link"><Link style={{"textDecoration": "none","fontSize":"15px","paddingRight":".5rem","paddingLeft":".5rem"}} to="/trip" title="contact">Voyage</Link></span>
			      </li>
			      <li className="nav-item">
			        <span className="nav-link active"><Link style={{"textDecoration": "none","fontSize":"15px","paddingRight":".5rem","paddingLeft":".5rem"}} to="/contact" title="contact">Contact</Link></span>
			      </li>
			      <button className="btn btn-success" style={{"fontWeight":"500px !important","borderRadius":"50px"}}>Nous appeler</button>
			    </ul>
		  </div>
		</nav>
	)
}

export default Header;