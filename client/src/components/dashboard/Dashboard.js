import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentUser } from "../../actions/userActions";
import { getCurrentOrg } from "../../actions/orgActions";

import ExpensesCard from "../dashboard/ExpensesCard";
import AreaChart from "./Charts/AreaChart";
import BarChart from "./Charts/BarChart";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentUser();

    const { user } = this.props.auth;

    //Using user, get organizaton
    this.props.getCurrentOrg(user.organiztion);

    const { budgets } = this.props.org;
  }

  render() {
    const { user } = this.props.auth;

    return (
      <div>
        <div className="row">
          <div className="col-12">
            <h1>Hello, {user.firstName}!</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <ExpensesCard title="Expenses" value="40,000" />
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  getCurrentOrg: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  org: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  org: state.org
});

export default connect(
  mapStateToProps,
  { getCurrentUser, getCurrentOrg }
)(Dashboard);
