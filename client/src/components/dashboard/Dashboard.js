import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentUser } from "../../actions/userActions";
import { getCurrentOrg } from "../../actions/orgActions";
import Spinner from "../common/Spinner";

import MonetaryCard from "./MonetaryCard";

class Dashboard extends Component {
  constructor() {
    super();

    this.totalUpArray = this.totalUpArray.bind(this);
  }

  totalUpArray(arr) {
    return arr.reduce((a, b) => ({ amount: a.amount + b.amount }));
  }

  componentDidMount() {
    this.props.getCurrentOrg();
  }

  render() {
    const { user, loading } = this.props.auth;
    const { organization } = this.props.org;

    let dashboardContent;

    if (organization === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      const budgetArray = organization.budgets;

      //Filter all NON-revenue items into an array
      const nonRevenueArr = budgetArray.filter(item => {
        if (!item.revenue) return item;
      });

      //Filter all revenue items into an array
      const revenueArr = budgetArray.filter(item => {
        if (item.revenue) return item;
      });

      const totalExpObj = this.totalUpArray(nonRevenueArr);
      const totalRevObj = this.totalUpArray(revenueArr);

      dashboardContent = (
        <div>
          <div className="row">
            <div className="col-12">
              <h1>Hello {user.firstName}!</h1>
            </div>
          </div>
          <div className="row">
            <MonetaryCard title="Expenses" value={totalExpObj.amount} />
            <MonetaryCard title="Revenue" value={totalRevObj.amount} />
          </div>
        </div>
      );
    }
    return <div>{dashboardContent}</div>;
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
