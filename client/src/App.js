import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Sidebar from "./components/layout/Sidebar";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Sidebar />
        </div>
      </Provider>
    );
  }
}

export default App;
