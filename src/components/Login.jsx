import React, { useState, useContext } from 'react';
import AppContext from 'context';

import { loginUser } from 'actions/appActions';

const Login = () => {
  const { dispatch, state } = useContext(AppContext);
  const [input, setInput] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    loginUser(dispatch, input);
  };

  const handleInputChange = (event) => {
    event.persist();
    setInput(() => ({ ...input, [event.target.name]: event.target.value }));
  };

  const { auth: { loading, error } } = state;

  return (
    <div className="row">
      <section className="content-area">
        <div className="flex-container login">
          <form action="" className="content login-form">
            <h2>Login to chat</h2>
            { error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <div className="input-group">
              <span className="input-group-addon"><i className="fa fa-user" /></span>
              <input type="text" name="username" className="form-control" onChange={handleInputChange} disabled={loading} placeholder="Enter your name" />
            </div>
            <button className="btn btn-info" type="button" onClick={handleSubmit}>
              {loading ? <i className="fa fa-spinner fa-spin" /> : 'Login'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
