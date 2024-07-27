import React from "react";
import classes from "./Button.module.css";

const Button = ({ label, disabled, onClick }) => {
  return (
    <div>
      <button onClick={onClick} disabled={disabled} className={classes.button}>
        {label}
      </button>
    </div>
  );
};

export default Button;
