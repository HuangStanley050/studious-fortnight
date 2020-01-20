import React from "react";
import { Container } from "reactstrap";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import Discover from "./pages/Discover.jsx";
import Profile from "./pages/Profile.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import AuthPage from "./pages/Auth.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function App() {
  return (
    <Container>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} exact={true} />
        <Route path="/discover" component={Discover} />
        <Route path="/profile/stats" component={Profile} />
        <Route path="/contact" component={Contact} />
        <Route path="/about" component={About} />
        <Route path="/auth" component={AuthPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </Container>
  );
}

export default App;
