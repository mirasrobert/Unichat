import { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import undrawQuickChat from '../../img/undraw_quick_chat.svg';
import { register } from '../../actions/auth-action';

const Register = ({ register, auth: { isAuthenticated, loading, errors }, history }) => {
  
  const [formData, setformData] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });

  const { name, email, password, confirm } = formData;

  const onChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const [error, setError] = useState({
    nameError: false,
    emailError: false,
    passwordError: false,
  });

  const { nameError, emailError, passwordError } = error;

  // Register
  const onSubmit = (e) => {
    e.preventDefault();

    // Check if password match
    if (password !== confirm) {
      setError('is-invalid');
    } else {
      //Register a new user
      register({
        name,
        email,
        password,
      });
    }
  };

  // Check if authenticated
  if (isAuthenticated) {
    history.push('/home');
    } 	

  return (
    <section id="login" className="my-5" style={{ position: 'relative' }}>
      <div className="container">
        <div className="row min-vh-100 d-flex justify-content-center align-items-center align-content-center">
          <div className="col-lg-6 col-sm-12 order-2">
            <div className="card">
              <div className="card-body">
                <h1 className="mb-3">Sign up</h1>
                <h6 className="card-subtitle mb-4 text-muted">
                  Please fill all the fields with your credentials
                </h6>
                <form onSubmit={(e) => onSubmit(e)}>
                  <div className="form-group mb-3">
                    <label>Name</label>
                    <input
                      type="text"
                      className={`form-control `}
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => onChange(e)}
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      eg. John Doe, Jane Smith
                    </small>
                    <div className="invalid-feedback"></div>
                  </div>
                  <div className="form-group mb-3">
                    <label>Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="name@domain.com"
                      value={email}
                      onChange={(e) => onChange(e)}
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      Your email address that you registered.
                    </small>
                  </div>
                  <div className="form-group mb-3">
                    <label>Password</label>
                    <input
                      type="password"
                      className={`form-control ${error}`}
                      id="password"
                      name="password"
                      placeholder="********"
                      value={password}
                      onChange={(e) => onChange(e)}
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      Atleast 8 characters long and combination of uppercase,
                      lowercase, and symbols
                    </small>
                  </div>
                  <div className="form-group">
                    <label>Confirm password</label>
                    <input
                      type="password"
                      className={`form-control ${error}`}
                      id="confirm"
                      name="confirm"
                      placeholder="********"
                      value={confirm}
                      onChange={(e) => onChange(e)}
                    />
                    <div className="invalid-feedback">
                      Password do not match
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Register
                  </button>
                  <div className="card-footer text-center">
                    <small className="text-muted">
                      Already have an account? <Link to="/">Sign In</Link>{' '}
                    </small>
                    <small className="d-block text-center">
                      <a href="#">Forgot password?</a>
                    </small>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-6 order-1 d-lg-block d-none">
            <img src={undrawQuickChat} alt="" className="img-fluid w-100" />
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { register })(Register);
