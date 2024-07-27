import React from "react";
import CodeMirror from "react-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";

const CodeEditor = ({ code, setCode, disabled = false }) => {
  const handleChange = (value) => {
    setCode(value);
  };
  return (
    <CodeMirror
      value={code}
      onChange={handleChange}
      options={{
        mode: "javascript",
        theme: "material",
        lineNumbers: true,
        readOnly: disabled === true,
      }}
    />
  );
};

export default CodeEditor;
