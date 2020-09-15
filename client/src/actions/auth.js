import axios from 'axios';
import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';

//Register User
export const register = ({ name, email, password }) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const body = JSON.stringify({ name, email, password });

	try {
		const res = await axios.post('/api/users', body, config);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		});
	} catch (err) {
		const errors = err.response.data.errors; //errorite ako gi ima od backend staj gi vo errors
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger'))); // za sekoj error isprintaj poraka i danger alert
		}

		dispatch({
			type: REGISTER_FAIL
		});
	}
};
