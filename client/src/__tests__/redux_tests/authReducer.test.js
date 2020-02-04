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
});
