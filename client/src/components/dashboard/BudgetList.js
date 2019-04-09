import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class BudgetList extends Component {
  render() {
    const budget = this.props.budget.map(bud => (
      <tr>
        <td>{bud.title}</td>
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

export default connect(null)(BudgetList);
