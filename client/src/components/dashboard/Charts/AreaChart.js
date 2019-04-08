import React, { Component } from "react";

export default class AreaChart extends Component {
  render() {
    return (
      <div class="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Area Chart</h6>
        </div>
        <div className="card-body">
          <div className="chart-area">
            <canvas id="myAreaChart" />
          </div>
          <hr />
          Styling for the area chart can be found in the{" "}
          <code>/js/demo/chart-area-demo.js</code> file.
        </div>
      </div>
    );
  }
}
