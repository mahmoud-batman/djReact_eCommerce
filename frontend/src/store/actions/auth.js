import axios from "axios";
import * as actionTypes from "../actions/actionTypes";
import { authurl } from "../../constants";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    user: user,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const authLogin = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`${authurl}/login/`, {
        email: email,
        password: password,
      })
      .then((res) => {
        const token = res.data.key;
        localStorage.setItem("token", token);
        dispatch(getUser(token));
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
};

export const authSignup = (email, password1, password2) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`${authurl}/registration/`, {
        email: email,
        password1: password1,
        password2: password2,
      })
      .then((res) => {
        const token = res.data.key;
        localStorage.setItem("token", token);
        dispatch(getUser(token));
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
};

const getUser = (token) => {
  return (dispatch) => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios.get(`${authurl}/user`).then((res) => {
      const user = res.data.email;
      localStorage.setItem("user", user);
      dispatch(authSuccess(token, user));
    });
  };
};

export const checkAuth = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      dispatch(authSuccess(token, user));
    } else {
      dispatch(logout());
    }
  };
};

export const resetError = () => {
  return {
    type: actionTypes.RESET_ERROR,
  };
};
