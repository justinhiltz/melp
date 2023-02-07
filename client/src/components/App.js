import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute";
import TopBar from "./layout/TopBar";
import MemeList from "./MemeList.js";
import MemeShowPage from "./MemeShowPage.js";
import NewMemeForm from "./NewMemeForm.js";
import NewReviewForm from "./NewReviewForm";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState({});
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/">
          <MemeList />
        </Route>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/memes/new" component={NewMemeForm}/>
        <Route 
          exact 
          path="/memes/:id"
          render={(props) => <MemeShowPage {...props} currentUser={currentUser}/>}
        />
      </Switch>
    </Router>
  );
};

export default hot(App);
