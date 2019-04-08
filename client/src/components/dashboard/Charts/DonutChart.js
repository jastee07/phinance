import React, { Component } from "react";
import SimpleCard from "../dashboard/SimpleCard";

export default class DonutChart extends Component {
  render() {
    return (
      <div class="col-xl-4 col-lg-5">
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Donut Chart</h6>
          </div>
          <div class="card-body">
            <div class="chart-pie pt-4">
              <canvas id="myPieChart" />
            </div>
            <hr />
            Styling for the donut chart can be found in the{" "}
            <code>/js/demo/chart-pie-demo.js</code> file.
          </div>
        </div>
      </div>
    );
  }
}
