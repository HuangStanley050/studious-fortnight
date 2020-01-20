import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./setupStore";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Home from './pages/Home.jsx';
import Footer from './components/Footer.jsx';
import Discover from './pages/Discover.jsx';
import Profile from './pages/Profile.jsx';
import Contact from "./pages/Contact.jsx";
import About from './pages/About.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

import * as serviceWorker from "./serviceWorker";

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <NavBar />
      <div>
        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path="/discover" component={Discover} />
          <Route path="/profile/stats" component={Profile} />
          <Route path="/contact" component={Contact} />
          <Route path="/about" component={About} />

          <Route component={NotFoundPage} />
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();