import React, { Component } from "react";
import propTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { addTransaction } from "../../actions/budgetActions";
import TextFieldGroup from "../common/TextFieldGroup";

class CreateTransaction extends Component {
  constructor() {
    super();

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
    //If they are just a user then not allowed
    //eventually we should just not show this option at all
    if (
      this.props.auth.isAuthenticated &&
      this.props.auth.user.role !== "admin"
    ) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newTrans = {
      title: this.state.title,
      amount: this.state.amount,
      date: this.state.date,
      description: this.state.description
    };

    console.log(this.props.budget.budget._id);

    /*this.props.addTransaction(
      newTrans,
      this.props.budget._id,
      this.props.history
    );*/
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
                        Add a Transaction
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
                      <button
                        href="#"
                        className="btn btn-success btn-icon-split"
                        type="submit"
                        Value="Submit"
                      >
                        <span className="icon text-white-50">
                          <i className="fas fa-check" />
                        </span>
                        <span className="text">Save</span>
                      </button>
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

CreateTransaction.propTypes = {
  addTransaction: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  budget: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  budget: state.budget,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addTransaction }
)(withRouter(CreateTransaction));
