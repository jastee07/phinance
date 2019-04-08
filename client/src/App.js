import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Sidebar from "./components/layout/Sidebar";
import RegisterUser from "./components/auth/RegisterUser";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import BudgetDashboard from "./components/budget/BudgetDashboard";

//Private Route
import PrivateRoute from "./components/common/PrivateRoute";

import "./App.css";
import RegisterOrg from "./components/auth/RegisterOrg";

// Check for token
if (localStorage.jwtToken) {
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set current user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //Check for expired token
  const currentTime = Date.now() / 1000;
  /*if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());

    //CLear current profile
    store.dispatch(clearCurrentProfile());
    //Redirect to login
    window.location.href = "/login";
  }*/
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <div className="row">
              <div className="col-3">
                <Sidebar />
              </div>
              <div className="col-9">
                <div className="container">
                  <Route exact path="/" component={Login} />
                  <Route
                    exact
                    path="/organizations/register"
                    component={RegisterOrg}
                  />
                  <Route exact path="/organizations/:id" />
                  <Switch>
                    <PrivateRoute
                      exact
                      path="/dashboard"
                      component={Dashboard}
                    />
                  </Switch>
                  <Switch>
                    <PrivateRoute
                      exact
                      path="/users/register"
                      component={RegisterUser}
                    />
                  </Switch>
                  <Switch>
                    <PrivateRoute
                      exact
                      path="/organizations/budget"
                      component={BudgetDashboard}
                    />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
