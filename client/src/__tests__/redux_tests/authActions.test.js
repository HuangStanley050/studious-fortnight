import Action from "../../store/actions";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";

import * as authAction from "../../store/actions/authActions";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};
const store = mockStore(initialState);
describe("Auth action creators for Redx", () => {
  beforeEach(() => {
    // Runs before each test in the suite
    store.clearActions();
    moxios.install();
  });
  afterEach(() => moxios.uninstall());
  test("should be able to send register success after register", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { userInfo: {} }
      });
    });
    const expectedActions = [
      { type: Action.REGISTER_START },
      { type: Action.REGISTER_OKAY }
    ];
    const store = mockStore({ stuff: {} });
    return store
      .dispatch(authAction.register({ email: "test", password: "test" }))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  test("should be able to login with the right email and password", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { userInfo: {}, token: "token" }
      });
    });
    const expectedActions = [
      { type: Action.LOGIN_START },
      { type: Action.LOGIN_OKAY, payload: { userInfo: {}, token: "token" } }
    ];
    const store = mockStore({ stuff: {} });
    return store
      .dispatch(authAction.login({ email: "test", password: "test" }))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
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
