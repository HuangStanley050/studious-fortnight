import Action from "./index";
import axios from "axios";
import API from "../../api";

const loginStart = () => ({
  type: Action.LOGIN_START
});

export const loginOkay = userInfo => ({
  type: Action.LOGIN_OKAY,
  userInfo
});

const loginFail = err => ({
  type: Action.LOGIN_OKAY,
  err
});

const registerStart = () => ({
  type: Action.REGISTER_START
});

const registerOkay = () => ({
  type: Action.REGISTER_OKAY
});

const registerFail = err => ({
  type: Action.REGISTER_START,
  err
});

// async function
//

export const register = userInfo => {
  return async dispatch => {
    dispatch(registerStart());
    let result = await axios.post(API.register, userInfo);
    console.log(result.data);
    dispatch(registerOkay());
  };
};

export const login = userInfo => {
  return async dispatch => {
    console.log(userInfo);
    dispatch(loginStart());
    let result = await axios.post(API.login, userInfo);
    dispatch(loginOkay(result.data.userInfo));
    console.log(result.data);
  };
};
