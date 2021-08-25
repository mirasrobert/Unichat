import './Chat.css'

const ChatForm = () => {
  return (
    <form className="form-inline w-100">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Type your message..."
        />
        <div className="input-group-append">
          <button className="btn btn-outline-primary" type="button">
            <i className="far fa-paper-plane"></i>
            Send
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChatForm;
