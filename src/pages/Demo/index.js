import React, { useEffect } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import AddMultiValueInput from "../../components/AddMultiValueInput";
import ImageUploader from "../../components/ImageUploader";
import MultiFileUploader from "../../components/MultiFileUploader";
import { Get } from "../../Axios/AxiosFunctions";

const Demo = () => {
  const [variations, setVariations] = useState([]);
  const [files, setFiles] = useState([]);
  let a = false;

  const getTask = async () => {
    const response = await Get(
      `http://localhost:4000/tasks?completed=${a}`,
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTZiODdjOWEzNzFkZWQxN2I1ZjMzOTciLCJpYXQiOjE3MDE1NDU5Mjl9.9GtdkNNiyrteRdENsMmdMRwvSG6mS-nx9Z84BvWEm78"
    );
    console.log(response, "////////////////////////");
  };

  useEffect(() => {
    getTask();
  }, []);

  return (
    <Container className="m-5 p-5">
      {/* <AddMultiValueInput array={variations} setArray={setVariations} /> */}
      {/* <ImageUploader /> */}
      {/* <MultiFileUploader
        files={files}
        setFiles={setFiles}
        acceptedTypes={["pdf"]}
      /> */}
    </Container>
  );
};

export default Demo;
