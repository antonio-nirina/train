import React  from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
	return(
		<nav class="navbar fixed-top navbar-light bg-light">
		  <a class="navbar-brand" href="#"><img alt="logo" src={"../assets/image/logo192.png"} /></a>
		  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		   <span class="navbar-toggler-icon"></span>
		  </button>

		  <div class="collapse navbar-collapse" id="navbarSupportedContent">
		    <div class="navbar-nav mr-auto">
		      	<ul class="navbar-nav mr-auto">
			      <li class="nav-item active">
			        <span class="nav-link"><Link to="/" title="home">Acceuil</Link></span>
			      </li>
			      <li class="nav-item">
			        <span class="nav-link"><Link to="/trip" title="contact">Voyage</Link></span>
			      </li>
			      <li class="nav-item">
			        <span class="nav-link"><Link to="/contact" title="contact">Contact</Link></span>
			      </li>
			  	</ul>
		    </div>
		  </div>
		</nav>
	);
}

export default Header;