import "./App.scss";
import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Landing from "./pages/Landing.jsx";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import Discover from "./pages/Discover.jsx";
import DiscoverShow from "./pages/DiscoverShow.jsx";
import Profile from "./pages/Profile.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import AuthPage from "./pages/Auth.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import PasswordReset from "./pages/PasswordReset";
import PrivateRoute from "./components/PrivateRoute";
import PasswordRecovery from "./pages/PasswordRecovery";

export const App = () => {
  return (
    <div className="meta">
      <NavBar />
      <div className="container">
        <Switch>
          <Route path="/" component={Landing} exact={true} />
          <PrivateRoute path="/my" component={Home} exact={true} />
          <PrivateRoute path="/my/discover" component={Discover} exact={true} />
          <PrivateRoute path="/my/discover/:id" component={DiscoverShow} />
          <PrivateRoute path="/my/profile/stats" component={Profile} />
          <Route path="/contact" component={Contact} />
          <Route path="/about" component={About} />
          <Route exact path="/auth" component={AuthPage} />

          <Route path="/password_recovery" component={PasswordRecovery} />
          <Route
            path="/reset_password/:userId/:token"
            render={({ match }) => (
              <PasswordReset
                userId={match.params.userId}
                token={match.params.token}
              />
            )}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
