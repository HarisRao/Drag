import React from "react";
import classes from "./DropDown.module.css";
import Select from "react-select";
const DropDown = ({
  value,
  setter,
  options,
  label,
  placeholder,
  isSearchable = false,
  isDisabled,
  isMulti = false,
  OptionLabel,
  OptionValue,
}) => {
  const handleChange = (selectedOption) => {
    setter(selectedOption);
  };
  const DropDownStyles = {
    control: (styles) => ({
      ...styles,
      borderColor: "#ccc",
      "&:hover": {
        borderColor: "#ccc",
        boxShadow: "none",
      },
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isSelected ? "red" : "#fff",
        color: isSelected ? "#fff" : "#000",
        cursor: isDisabled ? "not-allowed" : "pointer",
        "&:hover": {
          backgroundColor: "#ff000042",
        },
      };
    },
  };
  return (
    <div className={classes.dropDownDiv}>
      <style>{`
        .DropDown__control{
            borderColor:#ccc;
            box-shadow:none;
        }
        `}</style>
      <Select
        value={value}
        styles={DropDownStyles}
        onChange={handleChange}
        label={label}
        placeholder={placeholder}
        isSearchable={isSearchable}
        isDisabled={isDisabled}
        isMulti={isMulti}
        classNamePrefix={"DropDown"}
        getOptionLabel={(option) =>
          OptionLabel ? option[`${OptionLabel}`] : option.label
        }
        getOptionValue={(option) =>
          OptionValue ? option[`${OptionValue}`] : option.value
        }
        options={options}
      />
    </div>
  );
};

export default DropDown;
