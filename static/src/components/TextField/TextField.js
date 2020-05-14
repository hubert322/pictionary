import React from "react";
import MaterialTextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

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
  const { label, variant, value, onChange, error, customStyle } = props;

  return (
    <MaterialTextField
      label={label}
      variant={variant}
      value={value}
      onChange={onChange}
      error={error}
      className={`${classes.textField} ${customStyle}`}
    />
  );
}

TextField.propTypes = {
  label: PropTypes.string,
  variant: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  customStyle: PropTypes.string
};

TextField.defaultProps = {
  label: null,
  variant: null,
  value: null,
  onChange: null,
  error: null,
  customStyle: ""
};

export default TextField;
