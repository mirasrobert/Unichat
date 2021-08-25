import { combineReducers } from 'redux';

import auth from './auth';
import onlines from './onlines';

export default combineReducers({
	auth,
	onlines
});
