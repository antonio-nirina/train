import React  from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {reduxForm,Field} from 'redux-form';

import Header from './header';
import Footer from './footer';
import {register} from '../actions/userAction';

class Signup extends React.Component {
	handleFormSubmit({nom,tel,email,password}){
    	const obj = {
    		'name':nom,
    		'phone':tel,
		    'email':email,
		    'password':password
		  };

    	this.props.register(obj, (path) => {
    		this.props.params.history.push(path)
    	})
    };
	// submitted,valid,invalid,touched,pristine
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
		const {handleSubmit} = this.props
		return(
			<div>
				<Header />
				<div className="content container">
				{/*eslint-disable */}
				    <div className="wrap connexion formulaire" style={{"width":"50%","margin":"0 auto"}}>
					    <div className="bloc noborder">
								<h1 className="text-center">Inscription</h1>
								{this.props.status ? (
									<div className="alert alert-danger text-center" role="alert">
	  									{this.props.status}
									</div>								
								):(
									<div></div>
								)}
								<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
									<Field name="nom" label="" component={this.renderInput} type="text" placeholder="Nom" required={true} />
									<Field name="tel" label="" component={this.renderInput} type="text" placeholder="Téléphone" required={true} />
									<Field name="email" label="" component={this.renderInput} type="text" placeholder="Email" required={true} />
									<Field name="password" label="" component={this.renderInput} type="password" placeholder="Mot de passe" required={true} />
								    <div className="text-center bottom">
									    <button 
									    className="btn bt btBlue" 									   
									    >
									    Inscription
									    </button><br/>
		                                 Vous avez déjà un compte ?<br/>
		                                 <Link to="/login">Connectez-vous !</Link><br/><br/>
								    </div>
								</form>						
					    </div>
					</div>
			    </div>
			    <Footer/>
		</div>
		  	)
	}
}

function validate(values) {
	const errors = {};

	if (!values.nom) {
    	errors.nom = 'Merci de saisir votre nom.';
  	}

  	if (!values.tel) {
    	errors.tel = 'Merci de saisir votre numero téléphone.';
  	}

  	if (!values.email) {
    	errors.email = 'Merci de saisir votre Email.';
  	}

  	if (!values.password) {
    	errors.password = 'Merci de saisir votre Mot de passe.';
  	}

    return errors;
}

Signup = reduxForm({
	form: 'register_form',
	validate: validate
})(Signup)

function mapStateToProps(state, ownProps) {
	let a_status = state.user.register;
	let _st = ''
	if (a_status) {
		 _st = a_status.code === 400 ? a_status.message : ''
	}

	return {
		params: ownProps,
		status: _st 
	}
}

export default connect(mapStateToProps,{register})(Signup);