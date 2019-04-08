import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentUser } from "../../actions/userActions";

import ExpensesCard from "../dashboard/ExpensesCard";
import AreaChart from "./Charts/AreaChart";
import BarChart from "./Charts/BarChart";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentUser();
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
            <ExpensesCard />
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentUser }
)(Dashboard);
