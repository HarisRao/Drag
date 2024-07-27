import React, { useRef } from "react";
import classes from "./ProfileImg.module.css";
import { FaRegUser } from "react-icons/fa";

const ProfileImg = ({ value, setter }) => {
  const imgRef = useRef(null);
  return (
    <div>
      <div onClick={() => imgRef.current.click()} className={classes.imgDiv}>
        {value ? (
          <img src={URL.createObjectURL(value)} alt="..." />
        ) : (
          <FaRegUser size={40} color={"#ccc"} />
        )}
      </div>
      <input
        type={"file"}
        ref={imgRef}
        style={{ display: "none" }}
        onChange={(e) => setter(e.target.files[0])}
      />
    </div>
  );
};

export default ProfileImg;
