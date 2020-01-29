import Action from "../actions";

const initialState = {
  isAuth: false,
  hasRegistered: false,
  userInfo: {},
  loading: false,
  meditationSession: {},
  error: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Action.LOGOUT:
      localStorage.removeItem("CMCFlow");
      return {
        ...state,
        userInfo: {},
        isAuth: false
      };
    case Action.CLEAR_AUTH_ERROR:
      return {
        ...state,
        error: ""
      };
    case Action.TURN_OFF_QUIZ:
      return {
        ...state,
        hasRegistered: false,
        meditationSession: {
          ...state.meditationSession,
          ...action.data
        }
      };
    case Action.REGISTER_START:
      return {
        ...state,
        loading: true
      };
    case Action.REGISTER_OKAY:
      return {
        ...state,
        loading: false,
        hasRegistered: true
      };
    case Action.REGISTER_FAIL:
      const error = action.err.response.data.msg;
      //console.log(action.err.response.data.msg);
      return {
        ...state,
        loading: false,
        error
      };
    case Action.LOGIN_FAIL:
      //console.log(action.err.response);
      return {
        ...state,
        loading: false,
        error: action.err.response.data.msg
      };
    case Action.LOGIN_START:
      return {
        ...state,
        loading: true
      };
    case Action.LOGIN_OKAY:
      // console.log(action.payload.userInfo);
      //console.log(action.payload.token);
      localStorage.setItem("CMCFlow", action.payload.token);
      //console.log("local set!");
      return {
        ...state,
        isAuth: true,
        userInfo: {
          ...state.userInfo,
          ...action.payload.userInfo
        },
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
