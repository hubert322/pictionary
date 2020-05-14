import React from "react";
import PropTypes from "prop-types";
import "./Panel.css";

function Panel(props) {
  const { children, className } = props;
  return <div className={`Panel ${className}`}>{children}</div>;
}

Panel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  className: PropTypes.string
};

Panel.defaultProps = {
  children: [],
  className: ""
};

export default Panel;
