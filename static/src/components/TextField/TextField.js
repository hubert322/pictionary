import React from "react";
import MaterialTextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes, { object } from "prop-types";

const useStyles = makeStyles({
  textField: {
    margin: "7px",
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#f64f59"
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#c471ed"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#12c2e9"
    },
    "& .MuiOutlinedInput-root": {
      color: "white"
    },
    "& label": {
      color: "white"
    },
    "& label.Mui-focused": {
      color: "white"
    }
  }
});

function TextField(props) {
  const classes = useStyles();
  const {
    label,
    variant,
    value,
    onChange,
    error,
    inputRef,
    onKeyDown,
    className
  } = props;

  console.log(props);

  return (
    <MaterialTextField
      label={label}
      variant={variant}
      value={value}
      onChange={onChange}
      error={error}
      inputRef={inputRef}
      onKeyDown={onKeyDown}
      className={`${classes.textField} ${className}`}
    />
  );
}

TextField.propTypes = {
  label: PropTypes.string,
  variant: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  inputRef: PropTypes.objectOf(object),
  onKeyDown: PropTypes.func,
  className: PropTypes.string
};

TextField.defaultProps = {
  label: null,
  variant: "standard",
  value: null,
  onChange: null,
  error: null,
  inputRef: null,
  onKeyDown: null,
  className: ""
};

export default TextField;
