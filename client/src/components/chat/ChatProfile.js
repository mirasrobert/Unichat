import './Chat.css';

import { connect } from 'react-redux';
import { logout } from '../../actions/auth-action';

const ChatProfile = ({ logout }) => {
  return (
    <div>
      <div className="settings-tray mt-2 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center justify-content-center">
          <img
            className="profile-image ml-3"
            src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/filip.jpg"
            alt="Profile img"
          />
          <span className="m-0 p-0">John Doe</span>
        </div>
        <span className="settings-tray">
          <a href="#">
            <i className="fas fa-sync-alt mr-3 text-muted"></i>
          </a>
          <a href="#">
            <i className="far fa-comment-alt mr-3 text-muted"></i>
          </a>

          <span className="dropdown">
            <a type="button" id="dropdownMenuButton" data-toggle="dropdown">
              <i className="fas fa-bars mr-3 text-muted"></i>
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a
                onClick={logout}
                className="dropdown-item"
                type="button"
                role="button"
                href="/login"
              >
                Logout
              </a>
            </div>
          </span>
        </span>
      </div>
    </div>
  );
};

export default connect(null, { logout })(ChatProfile);
