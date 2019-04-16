import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { setUserToEdit } from "../../actions/userActions";

class MemberList extends Component {
  onEditMemberClick(id, firstName, lastName, email, role) {
    const memData = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      role: role
    };

    this.props.setUserToEdit(memData);

    localStorage.setItem("mem_id", id);
    localStorage.setItem("mem_firstName", firstName);
    localStorage.setItem("mem_lastName", lastName);
    localStorage.setItem("mem_email", email);
    localStorage.setItem("mem_role", role);

    this.props.history.push("/edit-member");
  }

  render() {
    const memList = this.props.organization.members.map(mem => (
      <tr key={mem._id}>
        <td>{mem.firstName}</td>
        <td>{mem.lastName}</td>
        <td>{mem.role}</td>
        <td>
          <button
            className="btn btn-primary"
            onClick={this.onEditMemberClick.bind(
              this,
              mem._id,
              mem.firstName,
              mem.lastName,
              mem.email,
              mem.role
            )}
          >
            Edit
          </button>
        </td>
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
  setUserToEdit: PropTypes.func.isRequired,
  org: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  org: state.org
});

export default connect(
  mapStateToProps,
  { setUserToEdit }
)(withRouter(MemberList));
