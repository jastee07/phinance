import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";

class DoughnutChart extends Component {
  render() {
    return (
      <div className="card shadow mb-4" style={{ marginTop: "5%" }}>
        <div className="card-header py-3">
          <h4 className="font-weight-bold text-primary">Budget Breakdown</h4>
        </div>
        <div className="card-body">
          <Doughnut data={this.props.data} redraw={true} />
        </div>
      </div>
    );
  }
}

export default DoughnutChart;
