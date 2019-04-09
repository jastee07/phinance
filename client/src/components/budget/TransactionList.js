import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { setCurrentBudget } from "./../../actions/budgetActions";
import BudgetDashboard from "./BudgetDashboard";

class TransactionList extends Component {
  render() {
    const { budget } = this.props.budget;

    const transList = budget.transactions.map(tran => (
      <tr key={tran._id}>
        <td>{tran.title}</td>
        <td>{tran.amount}</td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mb-14">Budgets</h4>
        <table className="table">
          <thead>
            <tr>
              <th />
              <th>Title</th>
              <th>Amount</th>
              <th />
            </tr>
            {transList}
          </thead>
        </table>
      </div>
    );
  }
}

TransactionList.propTypes = {
  budget: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  budget: state.auth
});

export default connect(mapStateToProps)(TransactionList);
