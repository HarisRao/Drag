import React, { useState } from "react";
import classes from "./InputWithSend.module.css";
import { RiSendPlaneFill } from "react-icons/ri";

const InputWithSend = ({ handleClick }) => {
  const [message, setMessage] = useState("");
  return (
    <div className={classes.inputSendDiv}>
      <input
        placeholder={"Send Message..."}
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        onKeyDown={async (e) => {
          if (["Enter", "NumpadEnter"].includes(e.key)) {
            await handleClick(message);
            setMessage("");
          }
        }}
      />
      <RiSendPlaneFill className={classes.sendIcon} size={20} />
    </div>
  );
};

export default InputWithSend;
