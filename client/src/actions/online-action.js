import { USER_ONLINE } from './constants';
import { loadUser } from './auth-action';

// Set Online Users
export const setOnlineUsers = (users) => async (dispatch) => {

	try {
  
	  // If axios is success -- put token in localStorage
	  dispatch({
		type: USER_ONLINE,
		payload: users,
	  });
  
	  dispatch(loadUser());
	} catch (err) {
	  // Get the errors
	  const errors = err.response.data.errors;
  
	  // If there are errors, show them
	  if (errors) {
		errors.forEach((error) => {
		  toastr.error(error.msg);
		});
	  }
  
	  // Dispatch LOGIN_FAIL to remove token from localStorage
	  dispatch({
		type: LOGIN_FAIL,
	  });
	}
  };