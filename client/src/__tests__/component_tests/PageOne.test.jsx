
import PageOne from "../../components/PageOne.jsx";
import React from "react";
import {Account} from "../../components/Account";
import { BrowserRouter, Route, BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import {Provider} from "react-redux";


test("<PageOne /> should render a H2 with an id of data-testid='MeditationExperience'", () => {
    const store = {getState: () => {}, subscribe: () => {}, dispatch: ()=> {}}
    const testComponent = (
        <Provider store={store}>
            <Router>
                    <Route component={PageOne} />
            </Router>
      </Provider>
    );
    const { getByTestId } = render(testComponent);
    const PageOneTitle = getByTestId("MeditationExperience")

    expect(PageOneTitle).toBeInTheDocument();
    
});
