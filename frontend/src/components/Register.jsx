import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../features/actions/authAction";
import { useAlert } from "react-alert";
import { useEffect } from "react";
import {
  ERROR_MESSAGE_CLEAR,
  SUCCESS_MESSAGE_CLEAR,
} from "../app/type/authType";

const Register = ({ history }) => {
  const alert = useAlert();
  const { loading, successMessage, error, authenticate, myInfo } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const [state, setState] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  const [loadImage, setLoadImage] = useState("");

  const inputHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const filehandle = (e) => {
    if (e.target.files.length !== 0) {
      setState({
        ...state,
        [e.target.name]: e.target.files[0],
      });
    }

    const reader = new FileReader();

    reader.onload = () => {
      setLoadImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const register = (e) => {
    const { userName, email, password, image, confirmPassword } = state;
    e.preventDefault();

    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("image", image);

    dispatch(userRegister(formData));
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
    <div>
      <div className="register">
        <div className="card">
          <div className="card-header">
            <h3>Register</h3>
          </div>
          <div className="card-body">
            <form onSubmit={register} action="">
              <div className="form-group">
                <label htmlFor="username">User Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="user name"
                  id="username"
                  name="userName"
                  onChange={inputHandler}
                  value={state.userName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="email"
                  id="email"
                  name="email"
                  onChange={inputHandler}
                  value={state.email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                  id="password"
                  name="password"
                  onChange={inputHandler}
                  value={state.password}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="confirm password"
                  id="confirmpassword"
                  name="confirmPassword"
                  onChange={inputHandler}
                  value={state.confirmPassword}
                />
              </div>
              <div className="form-group">
                <div className="file-image">
                  <div className="image">
                    {loadImage ? <img src={loadImage} /> : ""}
                  </div>
                  <div className="file">
                    <label htmlFor="image">Select Image</label>
                    <input
                      type="file"
                      onChange={filehandle}
                      name="image"
                      className="form-control"
                      id="image"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <input type="submit" value="register" className="btn" />
                <span>
                  <Link to="/messenger/login">Login Your Account</Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
