import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { setCurrentBudget, deleteBudget } from "../../actions/budgetActions";
import { withRouter } from "react-router-dom";

class BudgetList extends Component {
  onBudgetClick(id) {
    localStorage.setItem("bud_id", id);

    this.props.setCurrentBudget(id);
  }

  onEditBudClick(id, title, amount, revenue) {
    console.log(id);

    localStorage.setItem("bud_id", id);
    localStorage.setItem("bud_title", title);
    localStorage.setItem("bud_amount", amount);
    localStorage.setItem("bud_revenue", revenue);

    this.props.setCurrentBudget(id);

    this.props.history.push("/edit-budget");
  }

  onBudgetDeleteClick(id) {
    this.props.deleteBudget(id, this.props.history);

    //"Refresh" page
    window.location.href = "/dashboard";
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
        <td>
          <button
            className="btn btn-primary"
            onClick={this.onEditBudClick.bind(
              this,
              bud._id,
              bud.title,
              bud.amount,
              bud.revenue
            )}
          >
            Edit
          </button>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={this.onBudgetDeleteClick.bind(this, bud._id)}
          >
            Delete
          </button>
        </td>
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
  setCurrentBudget: PropTypes.func.isRequired,
  deleteBudget: PropTypes.func.isRequired
};

export default connect(
  null,
  { setCurrentBudget, deleteBudget }
)(withRouter(BudgetList));
