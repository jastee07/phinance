import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { setCurrentBudget } from "./../../actions/budgetActions";

class BudgetList extends Component {
  onBudgetClick(id) {
    console.log("Budget Clicked!");

    this.props.setCurrentBudget(id);
  }

  render() {
    const budget = this.props.budget.map(bud => (
      <tr key={bud._id}>
        <td>
          <Link
            to="/organizations/budget"
            onClick={this.onBudgetClick.bind(this, bud._id)}
          >
            {bud.title}
          </Link>
        </td>
        <td>{bud.amount}</td>
        <td>{bud.revenue}</td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mb-14">Budgets</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Revenue</th>
              <th />
            </tr>
            {budget}
          </thead>
        </table>
      </div>
    );
  }
}

BudgetList.propTypes = {
  setCurrentBudget: PropTypes.func.isRequired
};

export default connect(
  null,
  { setCurrentBudget }
)(BudgetList);
