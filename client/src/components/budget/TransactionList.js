import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteTransaction } from "./../../actions/budgetActions";
import { withRouter } from "react-router-dom";

class TransactionList extends Component {
  onEditTranClick(
    tran_id,
    tran_title,
    tran_amount,
    tran_description,
    tran_date
  ) {
    //Store values in local storage
    localStorage.setItem("tran_id", tran_id);
    localStorage.setItem("tran_title", tran_title);
    localStorage.setItem("tran_amount", tran_amount);
    localStorage.setItem("tran_description", tran_description);
    localStorage.setItem("tran_date", tran_date);

    this.props.history.push("/edit-transaction");
  }

  onDeleteTranClick(tran_id) {
    this.props.deleteTransaction(
      tran_id,
      this.props.budget.budget._id,
      this.props.history
    );

    //"Refresh" page
    window.location.href = "/budget";
  }

  render() {
    const transList = this.props.transactions.map(tran => (
      <tr key={tran._id}>
        <td>{tran.title}</td>
        <td>{tran.amount}</td>
        <td>
          <button
            className="btn btn-primary"
            onClick={this.onEditTranClick.bind(
              this,
              tran._id,
              tran.title,
              tran.amount,
              tran.description,
              tran.date
            )}
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
              <th>Title</th>
              <th>Amount</th>
              <th />
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
  deleteTransaction: PropTypes.func.isRequired,
  budget: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  budget: state.budget
});

export default connect(
  mapStateToProps,
  { deleteTransaction }
)(withRouter(TransactionList));
