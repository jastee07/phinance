import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const MonetaryCard = ({ title, value, icon }) => {
  return (
    <div className="mb-4">
      <div className={classnames("card border-left-primary shadow h-100 py-2", { "border-left-danger": (title === "Expenses"), "border-left-success": (title === "Revenue") })}>
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col">
              <div className={classnames("text-s font-weight-bold text-primary mb-1", { "text-danger": (title === "Expenses"), "text-success": (title === "Revenue") })}>
                {title}
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                $ {value}
              </div>
            </div>
            {/* <div className="col-auto">
              <i className={icon} />
            </div> */}
          </div>
        </div>
      </div>
    </div >
  );
};

MonetaryCard.propTypes = {
  value: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default MonetaryCard;
