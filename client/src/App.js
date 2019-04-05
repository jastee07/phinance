import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Sidebar from "./components/layout/Sidebar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";

//Private Route
import PrivateRoute from "./components/common/PrivateRoute";

import "./App.css";

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
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Switch>
                    <PrivateRoute
                      exact
                      path="/dashboard"
                      component={Dashboard}
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
