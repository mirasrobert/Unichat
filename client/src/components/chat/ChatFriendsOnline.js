import { Fragment } from 'react';
import './Chat.css';

const ChatFriendsOnline = ({ users, name }) => {
  return (
    <div className="friend-online mt-3">
      {users &&
        Object.keys(users).map((user, index) => (
          <Fragment>
            {user !== name ? (
              <div className="friend-drawer" key={index}>
                <div className="d-flex">
                  <img
                    className="profile-image"
                    src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg"
                    alt=""
                  />
                  <div className="text">
                    <h6>{user}</h6>
                    <p className="text-muted">Hey, you're arrested!</p>
                  </div>
                </div>
                <small className="time text-muted small">13:21</small>
              </div>
            ) : null}
          </Fragment>
        ))}
    </div>
  );
};

export default ChatFriendsOnline;
