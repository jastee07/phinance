import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

class DoughnutChart extends Component {
  render() {
    return (
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Doughnut Chart</h6>
        </div>
        <div className="card-body">
          <Doughnut data={this.props.data} />
        </div>
      </div>
    );
  }
}

export default DoughnutChart;
