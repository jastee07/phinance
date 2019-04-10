import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  setCurrentBudget,
  deleteTransaction
} from "./../../actions/budgetActions";
import BudgetDashboard from "./BudgetDashboard";

class TransactionList extends Component {
  constructor(props) {
    super(props);

    this.onDeleteTranClick = this.onDeleteTranClick.bind(this);
  }

  onDeleteTranClick(tran_id, bud_id) {
    this.props.deleteTransaction();
  }

  render() {
    const { budget } = this.props.budget;

    const transList = this.props.transactions.map(tran => (
      <tr key={tran._id}>
        <td>{tran.title}</td>
        <td>{tran.amount}</td>
        <td>
          <button className="btn btn-primary">Edit</button>
        </td>
        <td>
          <button className="btn btn-danger" onClick={this.onDeleteTranClick}>
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
  budget: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  budget: state.auth
});

export default connect(
  mapStateToProps,
  { deleteTransaction }
)(TransactionList);
