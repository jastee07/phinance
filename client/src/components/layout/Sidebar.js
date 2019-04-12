import React, { Component } from "react";

import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Sidebar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

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
          <a className="nav-link" href="_blank">
            <i className="fas fa-fw fa-user-edit" />
            <span>Edit Profile</span>
          </a>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="admin/new-member">
            <i className="fas fa-fw fa-user-friends" />
            <span> Add User</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/add-budget">
            <i className="fas fa-money-bill-wave-alt" />
            <span> Add Budget</span>
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
          <a className="nav-link" to="/register" href="_blank">
            <i className="fas fa-fw fa-user-plus" />
            <span> Sign Up</span>
          </a>
        </li>
      </ul>
    );

    return <div>{isAuthenticated ? authLinks : guestLinks}</div>;
  }
}

Sidebar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Sidebar);
