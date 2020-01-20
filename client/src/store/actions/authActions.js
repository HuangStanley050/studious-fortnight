import Action from "./index";
import axios from "axios";
import API from "../../api";

const loginStart = () => ({
  type: Action.LOGIN_START
});

const loginOkay = userInfo => ({
  type: Action.LOGIN_OKAY,
  userInfo
});

const loginFail = err => ({
  type: Action.LOGIN_OKAY,
  err
});

// async function

export const login = userInfo => {
  return async dispatch => {
    console.log(userInfo);
    dispatch(loginStart());
    let result = await axios.post(API.login, userInfo);
    dispatch(loginOkay(result.data.userInfo));
    console.log(result.data);
  };
};
