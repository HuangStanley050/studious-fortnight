import authReducer from "../../store/reducers/authReducer";
import Action from "../../store/actions/";

describe("Auth reducer testing", () => {
  test("Initial State is correct", () => {
    const action = { type: "dummy_action" };
    const initialState = {
      isAuth: false,
      hasRegistered: false,
      userInfo: {},
      loading: false,
      needUpdateMeditation: false,
      meditationSession: null,
      error: ""
    };

    expect(authReducer(undefined, action)).toEqual(initialState);
  });
  test("Register start", () => {
    const action = { type: Action.REGISTER_START };
    const expectedState = {
      isAuth: false,
      hasRegistered: false,
      userInfo: {},
      loading: true,
      needUpdateMeditation: false,
      meditationSession: null,
      error: ""
    };
    expect(authReducer(undefined, action)).toEqual(expectedState);
  });
  test("Login start", () => {
    const action = { type: Action.LOGIN_START };
    const expectedState = {
      isAuth: false,
      hasRegistered: false,
      userInfo: {},
      loading: true,
      needUpdateMeditation: false,
      meditationSession: null,
      error: ""
    };
    expect(authReducer(undefined, action)).toEqual(expectedState);
  });
  test("Logout ", () => {
    const action = { type: Action.LOGIN_OUT };
    const expectedState = {
      isAuth: false,
      hasRegistered: false,
      userInfo: {},
      loading: false,
      needUpdateMeditation: false,
      meditationSession: null,
      error: ""
    };
    expect(authReducer(undefined, action)).toEqual(expectedState);
  });
  test("Clear auth error ", () => {
    const action = { type: Action.CLEAR_AUTH_ERROR };
    const expectedState = {
      isAuth: false,
      hasRegistered: false,
      userInfo: {},
      loading: false,
      needUpdateMeditation: false,
      meditationSession: null,
      error: ""
    };
    expect(authReducer(undefined, action)).toEqual(expectedState);
  });
  test("Get current meditation error ", () => {
    const action = { type: Action.GET_CURRENT_MEDITATION_ERROR };
    const errorMeditation = "No current meditation";
    const expectedState = {
      isAuth: false,
      hasRegistered: false,
      userInfo: {},
      loading: false,
      needUpdateMeditation: false,
      meditationSession: null,
      error: errorMeditation
    };
    expect(authReducer(undefined, action)).toEqual(expectedState);
  });
});
