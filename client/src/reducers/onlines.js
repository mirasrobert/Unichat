// Auth Reducer
import {
	USER_ONLINE
  } from '../actions/constants';
  
  const initialState = {
	onlines: null
  };
  
  export default function (state = initialState, action) {

	const { type, payload } = action;

	switch (type) {

	  case USER_ONLINE:  
		return {
		 ...state,
		 onlines: payload
		};

  
	  default:
		return state;
	}
  }
  