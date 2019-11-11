import React, { useState } from 'react';
import Header from './header';
import Footer from './footer';


const Login = () => {
	const [visible, setVisible] = useState(0);

	return (
    <div>
    	<Header />
	    	<div>
	    		<p>Vous avez cliqué {visible} fois</p>
			    <button className="btn bt btBlue" onClick={() => setVisible(visible + 1)}>
			        Cliquez ici
			    </button>
	    	</div>
      <Footer />
    </div>
  );
}

export default Login;
