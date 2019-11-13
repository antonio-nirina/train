import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {reduxForm,Field} from 'redux-form';

import Header from './header';
import Footer from './footer';
import {getUserConnected} from '../actions/logAction';

class Login extends React.Component {
	handleFormSubmit({email,password}){
    	const obj = {
		    'username':email,
		    'password':password
		  };
    	this.props.getUserConnected(obj, (path) => {
    		this.props.params.history.push(path)
    	})
    };

    renderInput = ({ input, label, type,placeholder, meta: { touched, error,pristine,invalid,submitted }}) => (
      <div className="form-group">
      <label htmlFor={label}>{label}</label>
        <input
          className={ touched && invalid ? "form-control is-invalid" : 'form-control'}
          {...input}
          type={type}
          placeholder={placeholder}
        />
        { touched && error && <span className="error">{error}</span> }
      </div>
    );
	render() {
		const { handleSubmit} = this.props
		return(
			<div>					     					    	
				<Header/>
				{/*eslint-disable */}
				<div className="content container">
				    <div className="wrap connexion formulaire" style={{"width":"50%","margin":"0 auto"}}>
					    <div className="bloc noborder">
							<h1 className="text-center">Connexion</h1>
							{this.props.status ? (
								<div className="text-danger text-center" role="alert">
  									{this.props.status}
								</div>								
							):(
								<div></div>
							)}
							<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
					          	<Field name="email" component={this.renderInput} type="text" label="" placeholder="Email" />
					          	<Field name="password" component={this.renderInput} type="password" label="" placeholder="Mot de passe" />
					          	<div className="text-center bottom">
					          		<br/>
					          		Vous n'avez pas encore un compte?
					          		<br/>
	                                 <Link to="/signup">Inscrivez vous!</Link><br/><br/>
					          	</div>
					        </form>
					        
					    </div>														        					   
		    		</div>
		    	</div>
			    <Footer/>
		    </div>
		);
	}
}

function validate(values) {
  const errors = {};

    if (!values.email) {
      errors.email = 'Merci de saisir votre Email.';
    }

    if (!values.password) {
      errors.password = 'Merci de saisir votre Mot de passe.';
    }
    return errors;
}

Login = reduxForm({
	form: 'login_form',
	validate: validate
})(Login)

function mapStateToProps(state, ownProps) {
	let a_status = state.login.connected;

	let _st = '';
	let check = '';

	if (a_status) {
		_st = a_status.code === 400 ? a_status.message : '';
		check = a_status.check_status
	}

	return {
		params: ownProps,
		status: _st,
		checkStatus:check 
	}
}

export default connect(mapStateToProps,{getUserConnected})(Login);
