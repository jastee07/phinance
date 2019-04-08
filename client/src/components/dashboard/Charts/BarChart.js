import React, { Component } from "react";

export default class BarChart extends Component {
  render() {
    return (
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Bar Chart</h6>
        </div>
        <div className="card-body">
          <div className="chart-bar">
            <canvas id="myBarChart" />
          </div>
          <hr />
          Styling for the bar chart can be found in the{" "}
          <code>/js/demo/chart-bar-demo.js</code> file.
        </div>
      </div>
    );
  }
}
