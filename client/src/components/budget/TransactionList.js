import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  setCurrentBudget,
  deleteTransaction,
  addTransaction
} from "./../../actions/budgetActions";
import BudgetDashboard from "./BudgetDashboard";
import { withRouter } from "react-router-dom";

class TransactionList extends Component {
  onEditTranClick(tran_id) {
    this.props.deleteTransaction(
      tran_id,
      this.props.budget.budget._id,
      this.props.history
    );

    //"Refresh" page
    window.location.href = "/budget";
  }

  onDeleteTranClick(tran_id) {
    this.props.addTransaction(
      tran_id,
      this.props.budget.budget._id,
      this.props.history
    );

    //"Refresh" page
    window.location.href = "/budget";
  }

  render() {
    const { budget } = this.props.budget;

    const transList = this.props.transactions.map(tran => (
      <tr key={tran._id}>
        <td>{tran.title}</td>
        <td>{tran.amount}</td>
        <td>
          <button
            className="btn btn-primary"
            onClick={this.onEditTranClick.bind(this, tran._id)}
          >
            Edit
          </button>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={this.onDeleteTranClick.bind(this, tran._id)}
          >
            Delete
          </button>
        </td>
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
            </tr>
            {transList}
          </thead>
        </table>
      </div>
    );
  }
}

TransactionList.propTypes = {
  deleteTransaction: PropTypes.func.isRequired,
  addTransaction: PropTypes.func.isRequired,
  budget: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  budget: state.budget
});

export default connect(
  mapStateToProps,
  { deleteTransaction, addTransaction }
)(withRouter(TransactionList));
