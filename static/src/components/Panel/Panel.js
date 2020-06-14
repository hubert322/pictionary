import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import "./Panel.css";

const Panel = forwardRef((props, ref) => {
  const { children, className, customRef } = props;
  return (
    <div className={`Panel ${className}`} ref={customRef}>
      {children}
    </div>
  );
});

Panel.displayName = "Panel";

Panel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  className: PropTypes.string,
  customRef: PropTypes.func
};

Panel.defaultProps = {
  children: [],
  className: "",
  customRef: null
};

export default Panel;
