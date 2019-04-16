import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCurrentOrg } from "../../actions/orgActions";
import Spinner from "../common/Spinner";
import MemberList from "./MemberList";

class MembersDashboard extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getCurrentOrg();
  }

  render() {
    const { organization, loading } = this.props.org;

    let dashboardContent;

    if (organization === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      dashboardContent = (
        <div>
          <div className="row">
            <div className="col-6">
              <div className="row">
                <div className="col-12">
                  <h1>{organization.name} Member Dashboard</h1>
                </div>
              </div>
              <div className="row form-group">
                <div className="col-6">
                  <button className="btn btn-primary btn-icon-split">
                    <span className="icon text-white-50">
                      <i className="fas fa-user-plus" />
                    </span>
                    <span className="text">Add Member</span>
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-10">
                  <MemberList organization={organization} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <div>{dashboardContent}</div>;
  }
}

MembersDashboard.propTypes = {
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
  { getCurrentOrg }
)(withRouter(MembersDashboard));
