import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute'
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Chat from './components/chat/Chat';

// Redux
import { Provider } from 'react-redux';
import store from './Store';

import { loadUser } from './actions/auth-action';

import './App.css';

function App() {
  // Run Once - Check for Token
  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      store.dispatch(loadUser());
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          
          <Switch>
            <Route exact path="/"  component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/home" component={Chat} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
