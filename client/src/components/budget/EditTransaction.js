import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";

import { getCurrentOrg } from "../../actions/orgActions";
import {
  addTransaction,
  editTransaction,
  setCurrentBudget
} from "../../actions/budgetActions";

class EditTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      amount: "",
      date: "",
      description: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentOrg();

    //Retrieve budget id from local storage
    const bud_id = localStorage.getItem("bud_id");

    //Set current budget based on retrieved id in the redux state
    this.props.setCurrentBudget(bud_id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    //Retrieve transaction information from local storage
    const tran_id = localStorage.getItem("tran_id");
    const tran_title = localStorage.getItem("tran_title");
    const tran_amount = localStorage.getItem("tran_amount");
    const tran_description = localStorage.getItem("tran_description");
    const tran_date = localStorage.getItem("tran_date");

    //Set EditTransaction component state equal to local storage date
    this.setState({
      id: !isEmpty(tran_id) ? tran_id : "",
      title: !isEmpty(tran_title) ? tran_title : "",
      amount: !isEmpty(tran_amount) ? tran_amount : "",
      description: !isEmpty(tran_description) ? tran_description : "",
      date: !isEmpty(tran_date) ? tran_date : ""
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const transData = {
      title: this.state.title,
      amount: this.state.amount,
      date: this.state.date,
      description: this.state.description
    };

    const { budget } = this.props.budget;

    console.log(budget);

    this.props.editTransaction(
      this.state.id,
      budget._id,
      transData,
      this.props.history
    );
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-12">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">
                        Edit Transaction
                      </h1>
                    </div>
                    <form className="user" noValidate onSubmit={this.onSubmit}>
                      <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                          <TextFieldGroup
                            placeholder=" Title"
                            name="title"
                            value={this.state.title}
                            onChange={this.onChange}
                            error={errors.title}
                          />
                        </div>
                        <div className="col-sm-6 mb-3 mb-sm-0">
                          <TextFieldGroup
                            placeholder=" Amount"
                            name="amount"
                            value={this.state.amount}
                            onChange={this.onChange}
                            error={errors.amount}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <TextFieldGroup
                          placeholder=" Description"
                          name="description"
                          value={this.state.description}
                          onChange={this.onChange}
                          error={errors.description}
                        />
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                          <TextFieldGroup
                            placeholder=" Date"
                            name="date"
                            value={this.state.date}
                            onChange={this.onChange}
                            error={errors.date}
                          />
                        </div>
                      </div>
                      <input
                        type="submit"
                        className="btn btn-primary btn-user btn-block"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditTransaction.propTypes = {
  addTransaction: PropTypes.func.isRequired,
  editTransaction: PropTypes.func.isRequired,
  getCurrentOrg: PropTypes.func.isRequired,
  setCurrentBudget: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  budget: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  budget: state.budget,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addTransaction, editTransaction, getCurrentOrg, setCurrentBudget }
)(withRouter(EditTransaction));
