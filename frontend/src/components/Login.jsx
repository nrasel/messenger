import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../features/actions/authAction";
import { useAlert } from "react-alert";
import { useEffect } from "react";
import {
  ERROR_MESSAGE_CLEAR,
  SUCCESS_MESSAGE_CLEAR,
} from "../app/type/authType";

const Login = ({ history }) => {
  const alert = useAlert();

  const { loading, successMessage, error, authenticate, myInfo } = useSelector(
    (state) => state.auth
  );

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const inputHnadle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();
    dispatch(userLogin(state));
  };

  useEffect(() => {
    if (authenticate) {
      history.push("/");
    }
    if (successMessage) {
      alert.success(successMessage);
      dispatch({ type: SUCCESS_MESSAGE_CLEAR });
    }
    if (error) {
      error.map((err) => alert.error(err));
      dispatch({ type: ERROR_MESSAGE_CLEAR });
    }
  }, [successMessage, error]);

  return (
    <div className="login">
      <div className="card">
        <div className="card-header">
          <h3>Login</h3>
        </div>
        <div className="card-body">
          <form onSubmit={login}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                type="email"
                placeholder="email"
                name="email"
                id="email"
                onChange={inputHnadle}
                value={state.email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="password"
                name="password"
                id="password"
                className="form-control"
                onChange={inputHnadle}
                value={state.password}
              />
            </div>
            <div className="form-group">
              <input type="submit" value="Login" className="btn" />
            </div>
            <div className="form-group">
              <span>
                <Link to="/messenger/register">Register Your Account</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
