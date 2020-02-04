import {Discover} from "../../pages/Discover";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { render, fireEvent, wait } from "@testing-library/react";
import {Provider} from "react-redux";
import badges from "../../dummyData/badges";

test("<Discover /> should render 'Loading...'", () => {
  const store = {getState: () => {}, subscribe: () => {}}
    const user = {email: "mark@mark.com"}
    const testComponent = (
      <Provider store={store}>
        <Router>
          <Route render={(user) => (
                  <Discover

                  />
          )} />
        </Router>
      </Provider>
  );

  const { getByText } = render(testComponent);
  expect(getByText("Loading...")).toBeInTheDocument();
});

//trying to simulate some kind of API call?

// jest.mock("../../dummyData/badges");
// jest.mock("/api/course");
// jest.mock("/api/account/check-badges");

// test("<Discover /> should render 'Loading...'", async () => {
//   const store = {getState: () => {}, subscribe: () => {}}
//     const user = {email: "mark@mark.com"}
//     const testComponent = (
//       <Provider store={store}>
//         <Router>
//           <Route render={(user) => (
//                   <Discover

//                   />
//           )} />
//         </Router>
//       </Provider>
//   );

//   const { getByText } = render(testComponent);
//   // expect(getByText("Loading...")).toBeInTheDocument();
//   await wait(() => expect(getByText("Loading...")).toBeInTheDocument());

// });