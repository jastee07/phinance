import React from "react";
import PropTypes from "prop-types";

const MonetaryCard = ({ title, value }) => {
  return (
    <div className="col-xl-3 col-md-6 mb-4">
      <div className="card border-left-primary shadow h-100 py-2">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                {title}
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                ${value}
              </div>
            </div>
            <div className="col-auto">
              <i className="fas fa-calendar fa-2x text-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MonetaryCard.protoTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default MonetaryCard;
