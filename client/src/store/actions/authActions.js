import Action from "./index";
import axios from "axios";
import API from "../../api";

export const loginStart = () => ({
  type: Action.LOGIN_START
});

export const loginOkay = (userInfo, token) => ({
  type: Action.LOGIN_OKAY,
  payload: { userInfo, token }
});

export const loginFail = error => ({
  type: Action.LOGIN_FAIL,
  error
});

export const registerStart = () => ({
  type: Action.REGISTER_START
});

export const registerOkay = () => ({
  type: Action.REGISTER_OKAY
});

export const registerFail = err => ({
  type: Action.REGISTER_FAIL,
  err
});

export const logout = () => ({ type: Action.LOGOUT });

export const clearError = () => ({ type: Action.CLEAR_AUTH_ERROR });
// async function
//

export const register = userInfo => {
  return async dispatch => {
    try {
      dispatch(registerStart());
      let result = await axios.post(API.register, userInfo);
      //console.log(result.data);
      dispatch(registerOkay());
    } catch (err) {
      //console.log(err.response);
      dispatch(registerFail(err));
    }
  };
};

export const login = userInfo => {
  return async dispatch => {
    //console.log(userInfo);
    try {
      dispatch(loginStart());
      let result = await axios.post(API.login, userInfo);

      const userDetail = result.data.userInfo;
      const token = result.data.token;
      dispatch(loginOkay(userDetail, token));
    } catch (err) {
      console.log(err);
      const error = err.response.data.msg;
      dispatch(loginFail(error));
    }

    //console.log(result.data);
  };
};
