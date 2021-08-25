import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './Chat.css';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { setOnlineUsers } from '../../actions/online-action'

import PropTypes from 'prop-types';

import ChatProfile from './ChatProfile';
import ChatFriendsOnline from './ChatFriendsOnline';
import Chatmate from './Chatmate';
import Chatpanel from './Chatpanel';
import ChatForm from './ChatForm';
import Spinner from '../../img/Spinner.gif'
import { Fragment } from 'react';

const socket = io('http://localhost:5000');

const Chat = ({ setOnlineUsers ,auth: { user, loading } }) => { 

  const [users, setUsers] = useState({})

  if(user !== null && loading === false) {
    socket.emit('newOnlineUser', user.name)
  }

  if(user !== null && !loading) {
    
    socket.on('userJoined', users => {
      setUsers(users);
    });
  } 

	return (
    <Fragment>
      { user === null && loading === true ? <Fragment>
        <img src={Spinner} width="150" height="150" alt="" />
      </Fragment> : (
        <section id="chat" className="my-5">
        <div className="container">
            <div className="card">
              <div className="row card-body m-0 p-0">
                <div className="col-md-4 m-0 p-0 bg-light">
                  
                  <ChatProfile />
    
                  { users && user.name && !loading && (<ChatFriendsOnline users={users} name={user.name} />) }
    
                </div>
                <div className="col-md-8">
        
                  <Chatmate />
    
                  <hr />
    
                  <Chatpanel />
    
                  <div className="row mt-5">
                    <div className="col-lg-12">
                      <ChatForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        </section>
      ) }
    </Fragment>
	)
}

Chat.propTypes = {
  auth: PropTypes.object.isRequired,
  setOnlineUsers: PropTypes.func.isRequired,
  onlines: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  onlines: state.onlines
});

export default connect(mapStateToProps, { setOnlineUsers })(Chat);
