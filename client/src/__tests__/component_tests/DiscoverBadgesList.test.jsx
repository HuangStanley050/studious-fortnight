import DiscoverBadgesList from "../../components/DiscoverBadgesList";
import React from "react";
import { BrowserRouter, Route, BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";

//mock data for test to run:
import badges from "../../dummyData/badges.js";
const activeBadge = {id: 1, name: "Journey Starter", unlocked: true, description: "Well done on starting your journey!", image_url: "https://racquetapp.herokuapp.com/assets/brands/wilson-logo-93d269bd37dc60cdb1fb9b4aec17f6f87c14f47a3c60e500150adec642d1d9c5.png"}

test("<DiscoverBadgesList /> should render 'Journey Starter'", () => {
  const testComponent = (
    <BrowserRouter>  
        <Route render={( user ) => (
                <DiscoverBadgesList
                  badges={badges}
                  activeBadge={activeBadge}
                />)} 
        />
    </BrowserRouter>
  );
  const { getByText } = render(testComponent);
  
  expect(getByText("Journey Starter")).toBeInTheDocument();
});