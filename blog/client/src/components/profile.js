import React, { useState,useEffect } from 'react';

import Header from './header';
import Footer from './footer';

const Profile = () => {
	return(
		<div className="init">
			<Header />
			<div className="content">
				<p>Profile</p>
			</div>
			<Footer />
		</div>
	)
}

export default Profile;