// Auth actions
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import toastr from 'toastr';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  USER_ONLINE,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from './constants';

// Load User
export const loadUser = () => async (dispatch) => {
  // If there is a token in local storage

  const token = JSON.parse(localStorage.getItem('token')) || null;

  if (localStorage.getItem('token') !== null) {
    setAuthToken(token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ name, email, password });

    try {
      // Make a request from server
      const res = await axios.post('/api/users', body, config);

      // If axios is success -- put token in localStorage
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
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

      // Dispatch REGISTER_FAIL to remove token from localStorage
      dispatch({
        type: REGISTER_FAIL,
        payload: errors
      });
    }
  };

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    // Make a request from server
    const res = await axios.post('/api/auth', body, config);

    // If axios is success -- put token in localStorage
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
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

// Clear Profile -- Logout
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
