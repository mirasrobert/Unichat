import React, { Fragment, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import undrawMessage from '../../img/undraw_message.svg'
import { connect } from 'react-redux';
import { login } from '../../actions/auth-action';
import PropTypes from 'prop-types';

const Login = ({ login, auth: { isAuthenticated, loading }, history }) => {

	const [formData ,setFormData] = useState({
		email: '',
		password: ''
	});

	const { email, password } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}

	const onSubmit = (e) => {
		e.preventDefault();

		login(email, password);
	}

	if (isAuthenticated) {
		return <Redirect to="/home" />;
	}


  return (
	<section id="login" className="my-5">
		<div className="container">
			<div className="row min-vh-100 d-flex justify-content-center align-items-center align-content-center">
				<div className="col-lg-6 col-sm-12 order-2">
					<div className="card">
						<div className="card-body">
							<h1 className="mb-3">Log in.</h1>
							<h6 className="card-subtitle mb-4 text-muted">
								Login with your data that you entered during registration
							</h6>
							<form onSubmit={e => onSubmit(e) }>
								<div className="form-group mb-4">
								  <label>Email address</label>
								  <input type="email" className="form-control" id="email" name="email" placeholder="name@domain.com" value={email} onChange={ e => onChange(e) } />
								  <small id="emailHelp" className="form-text text-muted">Your email address that you registered.</small>
								</div>
								<div className="form-group">
								  <label>Password</label>
								  <input type="password" className="form-control" id="password" name="password" placeholder="********" value={password} onChange={ e => onChange(e) } />
								</div>
								<button type="submit" className="btn btn-primary w-100">Login</button>
								<div className="card-footer text-center">
									<small className="text-muted">Don't have an account? <Link to="/register">Sign up</Link> </small>
									<small className="d-block text-center"><a href="#">Forgot password?</a></small>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div className="col-lg-6 order-1 d-lg-block d-none">
					<img src={undrawMessage} className="img-fluid w-100" alt="quick-chat" />
				</div>
			</div>
		</div>
	</section>
  );
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	auth: state.auth
});
export default connect(mapStateToProps, { login })(Login);
