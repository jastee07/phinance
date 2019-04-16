import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class MemberList extends Component {
  render() {
    const memList = this.props.organization.members.map(mem => (
      <tr key={mem._id}>
        <td>{mem.firstName}</td>
        <td>{mem.lastName}</td>
        <td>{mem.role}</td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mb-14">Member List</h4>
        <table className="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Role</th>
            </tr>
            {memList}
          </thead>
        </table>
      </div>
    );
  }
}

MemberList.propTypes = {
  org: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  org: state.org
});

export default connect(mapStateToProps)(withRouter(MemberList));
