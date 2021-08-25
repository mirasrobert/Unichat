import axios from 'axios';

const setAuthToken = (token) => {
  // If there is token that will come from localStorage
  if (token) {
    //axios.defaults.headers.common['Authorization'] = token; // Put in global header
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization']; // Remove from global header
  }
};

export default setAuthToken;
