import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";

import { getCurrentOrg } from "../../actions/orgActions";
import { editMember } from "../../actions/userActions";

class EditMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      role: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentOrg();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.user.selectedUser) {
      const selectedUser = nextProps.user.selectedUser;

      selectedUser.firstName = !isEmpty(selectedUser.firstName)
        ? selectedUser.firstName
        : "";
      selectedUser.lastName = !isEmpty(selectedUser.lastName)
        ? selectedUser.lastName
        : "";
      selectedUser.email = !isEmpty(selectedUser.email)
        ? selectedUser.email
        : "";
      selectedUser.role = !isEmpty(selectedUser.role) ? selectedUser.role : "";

      const mem_firstName = localStorage.getItem("mem_firstName");
      const mem_lastName = localStorage.getItem("mem_lastName");
      const mem_email = localStorage.getItem("mem_email");
      const mem_id = localStorage.getItem("mem_id");
      const mem_role = localStorage.getItem("mem_role");

      //Retrieve selected user out of state and set local state equal to it to parse fields
      this.setState({
        id: !isEmpty(mem_id) ? mem_id : "",
        firstName: !isEmpty(mem_firstName) ? mem_firstName : "",
        lastName: !isEmpty(mem_lastName) ? mem_lastName : "",
        email: !isEmpty(mem_email) ? mem_email : "",
        role: !isEmpty(mem_role) ? mem_role : ""
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const memData = {
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      role: this.state.role
    };

    this.props.editMember(this.state.id, memData, this.props.history);
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
                      <h1 className="h4 text-gray-900 mb-4">Edit Member</h1>
                    </div>
                    <form className="user" onSubmit={this.onSubmit}>
                      <TextFieldGroup
                        placeholder="First Name"
                        name="firstName"
                        type="text"
                        value={this.state.firstName}
                        onChange={this.onChange}
                        error={errors.firstName}
                      />
                      <TextFieldGroup
                        placeholder="Last Name"
                        name="lastName"
                        type="text"
                        value={this.state.lastName}
                        onChange={this.onChange}
                        error={errors.lastName}
                      />
                      <TextFieldGroup
                        placeholder="Email"
                        name="email"
                        type="text"
                        value={this.state.email}
                        onChange={this.onChange}
                        error={errors.email}
                      />
                      {/* <TextFieldGroup
                        placeholder="Password"
                        name="password"
                        type="text"
                        value={this.state.password}
                        onChange={this.onChange}
                        error={errors.password}
                      /> */}
                      {/* <TextFieldGroup
                        placeholder="Date"
                        name="date"
                        type="text"
                        value={this.state.date}
                        onChange={this.onChange}
                        error={errors.date}
                      /> */}
                      <TextFieldGroup //TODO: This needs to be a dropdown
                        placeholder="Role (Admin or Member)"
                        name="role"
                        type="text"
                        value={this.state.role}
                        onChange={this.onChange}
                        error={errors.role}
                      />
                      {/* <TextFieldGroup //TODO: This needs to be a dropdown
                        placeholder="Organization"
                        name="organization"
                        type="text"
                        value={this.state.organization}
                        onChange={this.onChange}
                        error={errors.organization}
                      /> */}
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

EditMember.propTypes = {
  getCurrentOrg: PropTypes.func.isRequired,
  editMember: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  org: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  org: state.org,
  user: state.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getCurrentOrg, editMember }
)(withRouter(EditMember));
