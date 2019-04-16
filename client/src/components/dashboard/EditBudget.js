import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";

import { getCurrentOrg } from "../../actions/orgActions";
import { editBudget, setCurrentBudget } from "../../actions/budgetActions";

class EditBudget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      amount: "",
      revenue: false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleRevenue = this.toggleRevenue.bind(this);
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
    const bud_id = localStorage.getItem("bud_id");
    const bud_title = localStorage.getItem("bud_title");
    const bud_amount = localStorage.getItem("bud_amount");
    const bud_revenue =
      localStorage.getItem("bud_revenue") === "true" ? true : false;

    //Set EditTransaction component state equal to local storage date
    this.setState({
      id: !isEmpty(bud_id) ? bud_id : "",
      title: !isEmpty(bud_title) ? bud_title : "",
      amount: !isEmpty(bud_amount) ? bud_amount : "",
      revenue: !isEmpty(bud_revenue) ? bud_revenue : false
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const budData = {
      title: this.state.title,
      amount: this.state.amount,
      revenue: this.state.revenue
    };

    const { budget } = this.props.budget;

    this.props.editBudget(budget._id, budData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  toggleRevenue(e) {
    this.setState({ revenue: !this.state.revenue });
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
                      <h1 className="h4 text-gray-900 mb-4">Edit Budget</h1>
                    </div>
                    <form className="user" onSubmit={this.onSubmit}>
                      <TextFieldGroup
                        placeholder="Budget Title"
                        name="title"
                        type="text"
                        value={this.state.title}
                        onChange={this.onChange}
                        error={errors.title}
                      />
                      <TextFieldGroup
                        placeholder="Amount"
                        name="amount"
                        type="number"
                        value={this.state.amount}
                        onChange={this.onChange}
                        error={errors.amount}
                      />
                      <label htmlFor="revenue" className="form-check-label">
                        Revenue
                      </label>
                      <div className="form-check mb-4">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="revenue"
                          value={this.state.revenue}
                          checked={this.state.revenue}
                          onChange={this.toggleRevenue}
                          id="revenue"
                        />
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

EditBudget.propTypes = {
  editBudget: PropTypes.func.isRequired,
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
  { editBudget, getCurrentOrg, setCurrentBudget }
)(withRouter(EditBudget));
