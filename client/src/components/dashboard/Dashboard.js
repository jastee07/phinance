import React, { Component } from "react";
import SimpleCard from "../dashboard/SimpleCard";
import AreaChart from "./Charts/AreaChart";
import BarChart from "./Charts/BarChart";

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-3">
            <SimpleCard />
          </div>
        </div>
        <div class="row">
          <div class="col-xl-8 col-lg-7">
            <AreaChart />
            <BarChart />
          </div>
        </div>
      </div>
    );
  }
}
