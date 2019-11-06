import React  from 'react';
import {Link} from 'react-router-dom';
import Header from './header';
import Footer from './footer';


const Home = () => {
	return(
		<div>
			<Header />
			<div className="container">
				<h2 className="title-f text-center" style={{'marginBottom':'26px'}}>React formation</h2>
				<div className="list-cars row">
					<div className="prem-cars col-sm-4 col-12 text-center">
						<img src={require("../assets/image/bus-lite.jpg")} className="cars" />
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
						<img src={require("../assets/image/bus-premium.jpg")} className="cars"/>
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
						<img src={require("../assets/image/bus-vip.jpg")} className="cars" />
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
				<div className="list-offer">
					<div className="ds row">
						<div className="col-sm-12 col-md-6 vip-ds">
							<div className="list inter-block lf">
								<h2>ANTSIRANANA</h2>
								<p>ANTANANARIVO</p>
								<div>
									<p>VIP</p>
									<p>-</p>
								</div>
								<div>
									<p>PREMIUM</p>
									<p>-</p>
								</div>
								<div>
									<p>LITE</p>
									<p>Ar 90 000</p>
									<p>usd 32 </p>
								</div>
							</div>
						</div>
						<div className="col-sm-12 col-md-6 prem-ds">
							<div className="list inter-block lri">
								<h3>ANTSIRANANA</h3>
								<p>ANTANANARIVO</p>
								<div>
									<p>VIP</p>
									<p>-</p>
								</div>
								<div>
									<p>PREMIUM</p>
									<p>-</p>
								</div>
								<div>
									<p>LITE</p>
									<p>Ar 90 000</p>
									<p>usd 32 </p>
								</div>
							</div>
						</div>
					</div>
					<div className="tlm row">
						<div className="vip-tlm col-sm-6 col-md-4">
							<div className="list inter-block">
								<h3>ANTSIRANANA</h3>
								<p>ANTANANARIVO</p>
								<div>
									<p>VIP</p>
									<p>-</p>
								</div>
								<div>
									<p>PREMIUM</p>
									<p>-</p>
								</div>
								<div>
									<p>LITE</p>
									<p>Ar 90 000</p>
									<p>usd 32 </p>
								</div>
							</div>
						</div>
						<div className="prem-tlm col-sm-6 col-md-4">
							<div className="list inter-block">
								<h3>ANTSIRANANA</h3>
								<p>ANTANANARIVO</p>
								<div>
									<p>VIP</p>
									<p>-</p>
								</div>
								<div>
									<p>PREMIUM</p>
									<p>-</p>
								</div>
								<div>
									<p>LITE</p>
									<p>Ar 90 000</p>
									<p>usd 32 </p>
								</div>
							</div>
						</div>
						<div className="prem-mj col-sm-6 col-md-4">
							<div className="list inter-block">
								<h3>ANTSIRANANA</h3>
								<p>ANTANANARIVO</p>
								<div>
									<p>VIP</p>
									<p>-</p>
								</div>
								<div>
									<p>PREMIUM</p>
									<p>-</p>
								</div>
								<div>
									<p>LITE</p>
									<p>Ar 90 000</p>
									<p>usd 32 </p>
								</div>
							</div>
						</div>
					</div>
				</div>
			<Footer />
		</div>
	)
}

export default Home;