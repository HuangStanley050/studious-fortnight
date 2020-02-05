
import PageTwo from "../../components/PageTwo.jsx";
import React from "react";
import {Account} from "../../components/Account";
import { BrowserRouter, Route, BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import {Provider} from "react-redux";


test("<PageTwo /> should render a H2 with an id of data-testid='MeditationWhy'", () => {
    const store = {getState: () => {}, subscribe: () => {}, dispatch: ()=> {}}
    const testComponent = (
        <Provider store={store}>
            <Router>
                    <Route component={PageTwo} />
            </Router>
      </Provider>
    );
    const { getByTestId } = render(testComponent);
    const PageTwoTitle = getByTestId("MeditationWhy")

    expect(PageTwoTitle).toBeInTheDocument();
    
});
