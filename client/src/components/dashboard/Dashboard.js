import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentUser } from "../../actions/userActions";
import { getCurrentOrg } from "../../actions/orgActions";
import Spinner from "../common/Spinner";

import MonetaryCard from "./MonetaryCard";
import BudgetList from "./BudgetList";
import DoughnutChart from "./Charts/DoughnutChart.js";

//Object to represent Chart Data
var data = {
  labels: [],
  datasets: []
};

class Dashboard extends Component {
  constructor() {
    super();

    this.totalUpArray = this.totalUpArray.bind(this);
    this.accumulateChartData = this.accumulateChartData.bind(this);
  }

  totalUpArray(arr) {
    if (arr.length === 0) {
      return { amount: 0 };
    } else {
      return arr.reduce((a, b) => ({ amount: a.amount + b.amount }));
    }
  }

  componentDidMount() {
    this.props.getCurrentOrg();
  }

  //Takes in array of budget objects and extracts data for the doughnut chart
  accumulateChartData(budgetArray) {
    //Get titles of budgets
    let budgetTitles = budgetArray.map(a => a.title);
    data.labels = budgetTitles;

    //May need to construct dataset object here and then add to chartData
    let budgetDataSet = {
      data: [],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
    };

    //Get amounts of each budget
    let budgetAmounts = budgetArray.map(a => a.amount);
    budgetDataSet.data = budgetAmounts;
    data.datasets.push(budgetDataSet);
  }

  render() {
    const { user, loading } = this.props.auth;
    const { organization } = this.props.org;

    let dashboardContent;

    if (organization === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      const budgetArray = organization.budgets;

      //Establish Chart Data
      this.accumulateChartData(budgetArray);

      //Filter all NON-revenue items into an array
      const nonRevenueArr = budgetArray.filter(item => {
        if (!item.revenue) return item;
      });

      //Filter all revenue items into an array
      const revenueArr = budgetArray.filter(item => {
        if (item.revenue) return item;
      });

      const totalExpObj = this.totalUpArray(nonRevenueArr);
      const totalRevObj = this.totalUpArray(revenueArr);

      dashboardContent = (
        <div>
          <div className="row">
            <div className="col-12">
              <h1>Hello {user.firstName}!</h1>
            </div>
          </div>
          <div className="row">
            <MonetaryCard title="Expenses" value={totalExpObj.amount} />
            <MonetaryCard title="Revenue" value={totalRevObj.amount} />
          </div>
          <div className="row">
            <div className="col-6">
              <BudgetList budget={budgetArray} />
            </div>
            <div className="col-6">
              <DoughnutChart data={data} />
            </div>
          </div>
        </div>
      );
    }
    return <div>{dashboardContent}</div>;
  }
}

Dashboard.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  getCurrentOrg: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  org: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  org: state.org
});

export default connect(
  mapStateToProps,
  { getCurrentUser, getCurrentOrg }
)(Dashboard);
