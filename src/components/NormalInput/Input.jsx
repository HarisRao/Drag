import React, { useState } from "react";
import classes from "./input.module.css";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
export const NormalInput = ({
  state,
  setState,
  placeholder,
  style,
  className,
  Label,
  customLabel,
  type,
  onBlur,
  inputContainerClass,
  onKeyPress,
}) => {
  const [passToggle, setPassToggle] = useState(false);

  return (
    <>
      {Label && (
        <label style={{ ...customLabel }} className={classes.label}>
          {Label}
        </label>
      )}
      <div
        className={[
          classes.inputPassContainer,
          inputContainerClass && inputContainerClass,
        ].join(" ")}
      >
        <input
          style={style}
          placeholder={placeholder}
          className={[classes.inputtxt, className && className].join(" ")}
          value={state}
          type={passToggle == true ? "text" : type}
          onChange={(e) => setState(e.target.value)}
          onBlur={() => {
            onBlur !== undefined && onBlur();
          }}
          onKeyPress={(e) =>
            ["Enter", "NumpadEnter"].includes(e.code) && onKeyPress()
          }
        />
        {type == "password" && passToggle == false && (
          // <VisibilityOffIcon
          //   className={classes.passwordIcon}
          //   onClick={(e) => setPassToggle(!passToggle)}
          // />
          <></>
        )}
        {type == "password" && passToggle && (
          // <VisibilityIcon
          //   className={classes.passwordIcon}
          //   onClick={(e) => setPassToggle(!passToggle)}
          // />
          <></>
        )}
      </div>
    </>
  );
};
