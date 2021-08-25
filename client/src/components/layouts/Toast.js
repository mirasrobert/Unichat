import { Fragment } from 'react';
import './Toast.css';

const Toast = () => {
  return (
    <Fragment>
      <div className="toast-container">
        <div
          className="show toast"
        >
          <div className="d-flex">
            <div className="toast-body toast-danger d-flex align-items-center align-content-center">
              <div className="toast-icon toast-icon-danger">
                <i className="fas fa-exclamation-circle p-3"></i>
              </div>
              <div>
                <p className="font-weight-bold">Danger!</p>
                <p>Please include a valid email</p>
              </div>
            </div>
            <button
              type="button"
              className="mr-3 mb-1 close"
              data-dismiss="toast"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Toast;
