
import PageThree from "../../components/PageThree.jsx";
import React from "react";
import {Account} from "../../components/Account";
import { BrowserRouter, Route, BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import {Provider} from "react-redux";


test("<PageThree /> should render a H1 with an id of data-testid='MeditationTime'", () => {
    const store = {getState: () => {}, subscribe: () => {}, dispatch: ()=> {}}
    const testComponent = (
        <Provider store={store}>
            <Router>
                    <Route component={PageThree} />
            </Router>
      </Provider>
    );
    const { getByTestId } = render(testComponent);
    const PageThreeTitle = getByTestId("MeditationHour")

    expect(PageThreeTitle).toBeInTheDocument();
    
});
