import Action from "../../store/actions";
import configureStore from "redux-mock-store";
import * as meditationAction from "../../store/actions/meditationActions";

const mockStore = configureStore();
const initialState = {};
const store = mockStore(initialState);

describe("Meditation actions test cases", () => {
  beforeEach(() => {
    // Runs before each test in the suite
    store.clearActions();
  });
  test("Meditation sending out update actions", () => {
    const expectedAction = {
      type: Action.UPDATE_MEDITATION,
      condition: {}
    };
    store.dispatch(meditationAction.updateMeditation({}));
    let result = store.getActions();
    expect(result[0]).toEqual(expectedAction);
  });
  test("Meditation getting current meditations", () => {
    const expectedAction = {
      type: Action.GET_CURRENT_MEDITATION,
      data: {}
    };
    store.dispatch(meditationAction.getCurrentMeditationOkay({}));
    let result = store.getActions();
    expect(result[0]).toEqual(expectedAction);
  });
  test("Getting meditation errors", () => {
    const expectedAction = {
      type: Action.GET_CURRENT_MEDITATION_ERROR
    };
    store.dispatch(meditationAction.getCurrentMeditationError());
    let result = store.getActions();
    expect(result[0]).toEqual(expectedAction);
  });
});
