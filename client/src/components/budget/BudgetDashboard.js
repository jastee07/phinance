import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentUser } from "../../actions/userActions";
import { getCurrentOrg } from "../../actions/orgActions";
import Spinner from "../common/Spinner";
import TransactionList from "./TransactionList";

class BudgetDashboard extends Component {
  constructor() {
    super();

    this.totalUpArray = this.totalUpArray.bind(this);
  }

  totalUpArray(arr) {
    if (arr.length === 0) {
      return { amount: 0 };
    } else {
      return arr.reduce((a, b) => ({ amount: a.amount + b.amount }));
    }
  }

  render() {
    const { budget, loading } = this.props.budget;

    let dashboardContent;

    if (budget === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      const budTransactions = budget.transactions;

      dashboardContent = (
        <div>
          <div className="row">
            <div className="col-12">
              <h1>{budget.title} Budget Dashboard</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <TransactionList transactions={budTransactions} />
            </div>
          </div>
        </div>
      );
    }
    return <div>{dashboardContent}</div>;
  }
}

BudgetDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  org: PropTypes.object.isRequired,
  budget: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  org: state.org,
  budget: state.budget
});

export default connect(mapStateToProps)(BudgetDashboard);
