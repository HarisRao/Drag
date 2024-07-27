import React, { useState } from "react";
import classes from "./Input.module.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Input = ({
  value,
  setter,
  type = "text",
  label,
  placeholder,
  isFormik = false,
  errors,
  touched,
  name,
  className,
}) => {
  const [pass, setPass] = useState(false);
  return (
    <div className={[classes.mainInputDiv, className && className].join(" ")}>
      {label && <label className={classes.label}>{label}</label>}
      <input
        value={value}
        onChange={isFormik ? setter : (e) => setter(e.target.value)}
        placeholder={placeholder}
        className={
          errors.email && touched.email
            ? [classes.input, classes.error].join(" ")
            : classes.input
        }
        type={pass ? "text" : type}
        name={name}
      />
      {isFormik && errors && errors.email && touched.email && (
        <span className={errors.email && touched.email && classes.errorColor}>
          {errors.email}
        </span>
      )}
      <div className={classes.passwordIcon}>
        {type === "password" &&
          (pass ? (
            <AiOutlineEye size={26} onClick={() => setPass(false)} />
          ) : (
            <AiOutlineEyeInvisible size={26} onClick={() => setPass(true)} />
          ))}
      </div>
    </div>
  );
};

export default Input;
