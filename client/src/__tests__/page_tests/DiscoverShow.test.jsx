import DiscoverShow from "../../pages/DiscoverShow";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";

//having trouble getting props.match.params ?? Saying its null...

const props = { match: { params: { id: "1" } } };
test("<DiscoverShow /> should render 'Beginner'", () => {
  const store = { getState: () => {}, subscribe: () => {} };
  const testComponent = (
    <Provider store={store}>
      <Router>
        <Route render={() => <DiscoverShow {...props} />} />
      </Router>
    </Provider>
  );

  console.log(props);
  const { getByText } = render(testComponent);
  expect(getByText("Beginner")).toBeInTheDocument();
});
