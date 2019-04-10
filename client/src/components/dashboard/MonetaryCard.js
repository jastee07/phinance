import React from "react";
import PropTypes from "prop-types";

const MonetaryCard = ({ title, value, icon }) => {
  return (
    <div className="mb-4">
      <div className="card border-left-primary shadow h-100 py-2">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col">
              <div className="text-s font-weight-bold text-primary mb-1">
                {title}
              </div>
              <div className="h3 mb-0 font-weight-bold text-gray-800">
                $ {value}
              </div>
            </div>
            <div className="col-auto">
              <i className={icon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MonetaryCard.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default MonetaryCard;
