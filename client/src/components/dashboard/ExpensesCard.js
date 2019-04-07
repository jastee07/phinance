import React from "react";
import propTypes from "prop-types";
import classnames from "classnames";

class ExpensesCard extends Component {
  render() {
    const expenses = this.props.budgets.map();

    return (
      <div className="card border-left-primary shadow h-100 py-2">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                {title}
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {value}
              </div>
            </div>
            <div className="col-auto">
              <i className="fas fa-dollar-sign fa-2x text-gray-300" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ExpensesCard;
