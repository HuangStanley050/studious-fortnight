import Action from "../../store/actions";
import configureStore from "redux-mock-store";
import * as authAction from "../../store/actions/authActions";

const mockStore = configureStore();
const initialState = {};
const store = mockStore(initialState);
describe("Auth action creators for Redx", () => {
  beforeEach(() => {
    // Runs before each test in the suite
    store.clearActions();
  });
  test("should create an action to start login", () => {
    const expectedAction = {
      type: Action.LOGIN_START
    };
    store.dispatch(authAction.loginStart());
    //console.log(store.getActions());
    expect(store.getActions()).toContainEqual(expectedAction);
  });
  test("should create an action to start register", () => {
    const expectedAction = {
      type: Action.REGISTER_START
    };
    store.dispatch(authAction.registerStart());
    console.log(store.getActions());
    expect(store.getActions()).toContainEqual(expectedAction);
  });
  test("should create an action when register is okay", () => {
    const expectedAction = {
      type: Action.REGISTER_OKAY
    };
    store.dispatch(authAction.registerOkay());
    //console.log(store.getActions());
    expect(store.getActions()).toContainEqual(expectedAction);
  });
  test("should create an action when login fails", () => {
    const expectedAction = {
      type: Action.LOGIN_FAIL,
      error: "some error message"
    };
    store.dispatch(authAction.loginFail("some error message"));
    let result = store.getActions();
    expect(result[0]).toEqual(expectedAction);
  });
  test("should create an action when register fails", () => {
    const expectedAction = {
      type: Action.REGISTER_FAIL,
      err: "some error message"
    };
    store.dispatch(authAction.registerFail("some error message"));
    let result = store.getActions();
    expect(result[0]).toEqual(expectedAction);
  });
  test("should create an action when logging out", () => {
    const expectedAction = {
      type: Action.LOGOUT
    };
    store.dispatch(authAction.logout());
    let result = store.getActions();
    expect(result[0]).toEqual(expectedAction);
  });
  test("should clear error in authReducer", () => {
    const expectedAction = {
      type: Action.CLEAR_AUTH_ERROR
    };
    store.dispatch(authAction.clearError());
    let result = store.getActions();
    expect(result[0]).toEqual(expectedAction);
  });
});
