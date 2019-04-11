import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { setCurrentBudget } from "./../../actions/budgetActions";

class BudgetList extends Component {
  onBudgetClick(id) {
    console.log("Budget Clicked!");

    localStorage.setItem("bud_id", id);

    this.props.setCurrentBudget(id);
  }

  render() {
    const budget = this.props.budget.map(bud => (
      <tr key={bud._id}>
        <td>
          <Link
            to="/budget"
            onClick={this.onBudgetClick.bind(this, bud._id)}
            style={{ textDecoration: "none", color: "#858796" }}
          >
            {bud.title}
          </Link>
        </td>
        <td>{bud.amount}</td>
      </tr>
    ));

    return (
      <div>
        <h2 className="mb-4">Budgets</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
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
