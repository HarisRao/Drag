import React, { useState } from "react";
import classes from "./AddRoomModal.module.css";
import { Modal } from "react-bootstrap";
import Button from "../../Button";
import { toast } from "react-toastify";
const AddRoomModal = ({ show, setShow, onClick }) => {
  const [message, setMessage] = useState("");
  const submit = async () => {
    if (message === "") {
      return toast.error("Please fill message field");
    }
    await onClick(message);
    setMessage("");
  };
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      centered
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <h3 className={classes.header}>Add Room Modal</h3>
      <Modal.Body>
        <textarea
          placeholder="Send Message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="form-control"
          rows={5}
        />
        <div className={classes.btnDiv}>
          <Button label={"Send"} onClick={submit} />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddRoomModal;
