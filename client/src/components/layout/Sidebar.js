import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import { setUserToEdit } from "../../actions/userActions";

class Sidebar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  onEditAccountClick(id, firstName, lastName, email, role) {
    const memData = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      role: role
    };

    console.log(id);

    this.props.setUserToEdit(memData);

    localStorage.setItem("mem_id", id);
    localStorage.setItem("mem_firstName", firstName);
    localStorage.setItem("mem_lastName", lastName);
    localStorage.setItem("mem_email", email);
    localStorage.setItem("mem_role", role);
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    console.log(user);

    //Only Show Sign In if not authenticated
    const authLinks = (
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark"
        id="accordionSidebar"
      >
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="dashboard"
        >
          <div className="sidebar-brand-icon">
            <i className="fas fa-coins" />
          </div>
          <div className="sidebar-brand-text mx-3">Phinance</div>
        </a>

        <hr className="sidebar-divider my-0" />

        <li className="nav-item active">
          <Link className="nav-link" to="/dashboard">
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Dashboard</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />

        <div className="sidebar-heading">Actions</div>

        <li className="nav-item">
          <Link className="nav-link" to="/members">
            <i className="fas fa-fw fa-user-edit" />
            <span> Organization Members</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/add-budget">
            <i className="fas fa-money-bill-wave-alt" />
            <span> Add Budget</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            to="/edit-member"
            onClick={this.onEditAccountClick.bind(
              this,
              user.id,
              user.firstName,
              user.lastName,
              user.email,
              user.role
            )}
          >
            <i className="fas fa-fw fa-cog" />
            <span> Edit Account</span>
          </Link>
        </li>

        <li className="nav-item">
          <a
            className="nav-link"
            href="_blank"
            onClick={this.onLogoutClick.bind(this)}
          >
            <i className="fas fa-fw fa-sign-out-alt" />
            <span> Logout</span>
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="dashboard"
        >
          <div className="sidebar-brand-icon">
            <i className="fas fa-coins" />
          </div>
          <div className="sidebar-brand-text mx-3">Phinance</div>
        </a>

        <hr className="sidebar-divider" />

        <div className="sidebar-heading">Actions</div>

        <li className="nav-item">
          <a className="nav-link" href="/">
            <i className="fas fa-fw fa-sign-in-alt" />
            <span> Log In</span>
          </a>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/register">
            <i className="fas fa-fw fa-user-plus" />
            <span> Sign Up</span>
          </Link>
        </li>
      </ul>
    );

    return <div>{isAuthenticated ? authLinks : guestLinks}</div>;
  }
}

Sidebar.propTypes = {
  setUserToEdit: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, setUserToEdit }
)(Sidebar);
