import Action from "../actions";
const initialState = {
  isAuth: false,
  userInfo: {},
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Action.LOGIN_START:
      return {
        ...state,
        loading: true
      };
    case Action.LOGIN_OKAY:
      return {
        ...state,
        isAuth: true,
        userInfo: {
          ...state.userInfo,
          ...action.userInfo
        },
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
