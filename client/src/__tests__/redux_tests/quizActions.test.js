import Action from "../../store/actions";
import configureStore from "redux-mock-store";
import { closeQuiz } from "../../store/actions/quizActions";

const mockStore = configureStore();
const initialState = {};
const store = mockStore(initialState);

beforeEach(() => {
  // Runs before each test in the suite
  store.clearActions();
});
test("Quiz action should return some data", () => {
  const expectedAction = {
    type: Action.TURN_OFF_QUIZ,
    data: {}
  };
  store.dispatch(closeQuiz({}));
  //console.log(store.getActions());
  let result = store.getActions();
  expect(result[0]).toEqual(expectedAction);
});
