import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCurrentUser } from "../../actions/userActions";
import { getCurrentOrg } from "../../actions/orgActions";
import Spinner from "../common/Spinner";
import TransactionList from "./TransactionList";

class BudgetDashboard extends Component {
  constructor() {
    super();

    this.totalUpArray = this.totalUpArray.bind(this);
    this.onAddTransClick = this.onAddTransClick.bind(this);
  }

  totalUpArray(arr) {
    if (arr.length === 0) {
      return { amount: 0 };
    } else {
      return arr.reduce((a, b) => ({ amount: a.amount + b.amount }));
    }
  }

  onAddTransClick(bud_id) {
    this.props.history.push("/organizations/budget/transactions");

    console.log("Add Transaction Clicked");
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
            <div className="col-6">
              <div className="row">
                <div className="col-12">
                  <h1>{budget.title} Budget Dashboard</h1>
                </div>
              </div>
              <div className="row form-group">
                <div className="col-6">
                  <button
                    className="btn btn-primary btn-icon-split"
                    onClick={() => {
                      this.onAddTransClick(budget._id);
                    }}
                  >
                    <span className="icon text-white-50">
                      <i className="fas fa-money-bill-alt" />
                    </span>
                    <span className="text">Add Transacation</span>
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-10">
                  <TransactionList transactions={budTransactions} />
                </div>
              </div>
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

export default connect(mapStateToProps)(withRouter(BudgetDashboard));
