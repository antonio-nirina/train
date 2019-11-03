import React  from 'react';
import {Link} from 'react-router-dom';
import Header from './header';

const Home = () => {
	return(
		<div>
			<Header />
			<div className="container">
				<h1 className="title-f text-center">React formation Tve</h1>
				<div className="list-cars row">
					<div className="prem-cars col-sm-4 col-12 text-center">
						<img src={require("../assets/image/bus-lite.jpg")} />
						<Link style={{"textDecoration": "none","fontSize":"15px"}} to="/contact" title="contact">PREMIUM</Link>
						<ul className="navbar-nav mr-auto">
					      <li className="nav-item active">
					        <span className="nav-link">Mercedes Sprinter4</span>
					      </li>
					      <li className="nav-item active">
					        <span className="nav-link">Bla Bla Bla</span>
					      </li>
					      <li className="nav-item active">
					        <span className="nav-link">Wi-Fi illimité.</span>
					      </li>
				      </ul>
					</div>
					<div className="prem-cars col-sm-4 col-12 text-center">
						<img src={require("../assets/image/bus-premium.jpg")} />
						<Link style={{"textDecoration": "none","fontSize":"15px"}} to="/contact" title="contact">VIP</Link>
						<ul className="navbar-nav mr-auto">
					      <li className="nav-item active">
					        <span className="nav-link">Mercedes Sprinter4</span>
					      </li>
					      <li className="nav-item active">
					        <span className="nav-link">Bla Bla Bla</span>
					      </li>
					      <li className="nav-item active">
					        <span className="nav-link">Wi-Fi illimité.</span>
					      </li>
				      </ul>
					</div>
					<div className="prem-cars col-sm-4 col-12 text-center">
						<img src={require("../assets/image/bus-vip.jpg")} />
						<Link style={{"textDecoration": "none","fontSize":"15px"}} to="/contact" title="contact">LITE</Link>
						<ul className="navbar-nav mr-auto">
					     <li className="nav-item active">
					        <span className="nav-link">Mercedes Sprinter4</span>
					      </li>
					      <li className="nav-item active">
					        <span className="nav-link">Bla Bla Bla</span>
					      </li>
					      <li className="nav-item active">
					        <span className="nav-link">Wi-Fi illimité.</span>
					      </li>
				      </ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home;