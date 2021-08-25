import './Chat.css';

const Chatmate = () => {
  return (
    <div className="chat-mate">
      <div className="settings-tray mt-2 d-flex justify-content-between align-items-center">
        <div>
          <img
            className="profile-image ml-3"
            src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg"
            alt="Profile img"
          />
          <span className="font-weight-bold m-0 p-0">Robo Cop</span>
        </div>
        <span className="settings-tray">
          <a href="#">
            <i className="fas fa-sync-alt mr-3 text-muted"></i>
          </a>
          <a href="#">
            <i className="far fa-comment-alt mr-3 text-muted"></i>
          </a>
          <a href="#">
            <i className="fas fa-bars mr-3 text-muted"></i>
          </a>
        </span>
      </div>
    </div>
  );
};

export default Chatmate;
