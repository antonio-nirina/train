import React  from 'react';
// import {Link} from 'react-router-dom';

const styles = {
	'margin':0,
	'textAlign': 'center',
}

const Footer = () => {
	return (
		<div className="footer" style={styles}>
			<div className="top">
				<span style={{"paddingRight":"13px"}}>Retrouvez-nous sur</span>
		        <a href="#" title="twitter" target="_blank" className="tw" rel="noopener noreferrer" style={{"margin": "0 5px"}}>
		       		<img src={require("../assets/image/twitter-icon.png")} />
		       	</a>
		        <a href="#" title="facebook" target="_blank" className="fb" rel="noopener noreferrer">
		       	 	<img src={require("../assets/image/facebook-icon.png")} />
		        </a>
			</div>
			<div className="bottom">
	          <div className="wrap">
	            <p className="copyright">©{(new Date()).getFullYear()}<a title="" href="#">FORMATION</a> All Rights Reserved</p>
	          </div>
	        </div>
		</div>
	)
}

export default Footer;