import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AdminRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (auth.isAuthenticated && auth.user.role === "admin") {
        return <Component {...props} />;
      } else if (auth.isAuthenticated) {
        return <Redirect to="/dashboard" />;
      } else {
        return <Redirect to="/login" />;
      }
    }}
  />
);

AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AdminRoute);
