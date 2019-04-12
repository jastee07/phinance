import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import PropTypes from "prop-types";
import { addBudget } from "../../actions/budgetActions";

class AddBudget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      amount: 0,
      revenue: false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleRevenue = this.toggleRevenue.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const budgetData = {
      title: this.state.title,
      amount: this.state.amount,
      revenue: this.state.revenue
    };

    this.props.addBudget(budgetData, this.props.history);
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
          <div className="col-xl-6 col-lg-6 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">New Budget</h1>
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
      </div>
    );
  }
}

AddBudget.propTypes = {
  organization: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addBudget: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  organization: state.organization,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addBudget }
)(withRouter(AddBudget));
