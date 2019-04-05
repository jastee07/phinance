import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Sidebar from "./components/layout/Sidebar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Sidebar />
        <Router>
          <div className="App">
            <div className="container">
              <Route exact path="/register" component={Register} />
            </div>
          </div>
        </Router>
        <div className="App">
          <Login />
        </div>
      </Provider>
    );
  }
}

export default App;
