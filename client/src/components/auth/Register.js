import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
// import axios from 'axios';

const Register = ({ setAlert, register, isAuthenticated }) => {
	const [ formData, setFormData ] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});

	const { name, email, password, password2 } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== password2) {
			//setAlert(msg = Passwords do not match,alertType =danger)
			setAlert('Passwords do not match', 'danger');
		} else {
			register({ name, email, password });

			// Post request so axios do api/users
			// const newUser = {
			// 	name,
			// 	email,
			// 	password
			// };
			// try {
			// 	const config = {
			// 		headers: {
			// 			'Content-Type': 'application/json'
			// 		}
			// 	};

			// 	const body = JSON.stringify(newUser);

			// 	const res = await axios.post('api/users', body, config);
			// 	console.log(res.data);
			// } catch (err) {
			// 	console.error(err.response.data);
			// }
		}
	};
	if (isAuthenticated) {
		return <Redirect to="/dashboard" />;
	}
	return (
		<Fragment>
			<h1 className="large text-primary">Sign Up</h1>
			<p className="lead">
				<i className="fas fa-user" /> Create Your Account
			</p>
			<form className="form" onSubmit={(e) => onSubmit(e)}>
				<div className="form-group">
					<input
						type="text"
						placeholder="Name"
						value={name}
						onChange={(e) => onChange(e)}
						name="name"
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="email"
						placeholder="Email Address"
						name="email"
						value={email}
						onChange={(e) => onChange(e)}
					/>
					<small className="form-text">
						This site uses Gravatar so if you want a profile image, use a Gravatar email
					</small>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Password"
						name="password"
						value={password}
						onChange={(e) => onChange(e)}
						minLength="6"
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Confirm Password"
						name="password2"
						value={password2}
						onChange={(e) => onChange(e)}
						minLength="6"
					/>
				</div>
				<input type="submit" className="btn btn-primary" value="Register" />
			</form>
			<p className="my-1">
				Already have an account? <Link to="/login">Sign In</Link>
			</p>
		</Fragment>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};
const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
});
//connect dobiva state objekt od reducer = null koj ako ne e null moze da go primime vo komponentata kako props,
// i objekt od akcii sto kje koristime{setAlert ,register} koj gi dobivame kako props

export default connect(mapStateToProps, { setAlert, register })(Register);
