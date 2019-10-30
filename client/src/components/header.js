import React  from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
	return(
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
		 <a className="navbar-brand" href="#"><img alt="logo" src={require("../assets/image/logo192.png")} style={{'width':'20%'}} /></a>
		  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		   <span className="navbar-toggler-icon"></span>
		  </button>
		  <div class="collapse navbar-collapse" id="navbarSupportedContent">
		    <ul class="navbar-nav mr-auto">
		      <li class="nav-item active">
		        <span className="nav-link"><Link to="/" title="home">Acceuil</Link></span>
		      </li>
		      <li class="nav-item">
		        <span className="nav-link"><Link to="/init" title="contact">Init</Link></span>
		      </li>
		      <li class="nav-item">
		        <span className="nav-link"><Link to="/trip" title="contact">Voyage</Link></span>
		      </li>
		      <li class="nav-item">
		        <span className="nav-link"><Link to="/contact" title="contact">Contact</Link></span>
		      </li>
		    </ul>
		  </div>
		</nav>
	)
}

export default Header;