import React from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { NormalInput } from "../NormalInput/Input";

const AddMultiValueInput = ({ array, setArray }) => {
  const [name, setName] = useState("");
  const [variationInputs, setVariationInputs] = useState([]);

  const SetInnerItems = (index) => {
    if (
      variationInputs[index]?.label === "" ||
      variationInputs[index]?.size === ""
    ) {
      return toast.error("please provide variations category");
    }
    const tempArray = [...array];
    let prevItems = tempArray[index]?.items ? tempArray[index]?.items : [];
    tempArray[index] = {
      ...tempArray[index],
      items: [
        ...prevItems,
        {
          label: variationInputs[index]?.label,
          size: variationInputs[index]?.size,
        },
      ],
    };
    setArray(tempArray);
    const tempInputs = [...variationInputs];
    tempInputs[index].label = "";
    tempInputs[index].size = "";
    setVariationInputs(tempInputs);
  };

  const handleVariationInputChange = (index, field, value) => {
    const tempInputs = [...variationInputs];
    if (!tempInputs[index]) {
      tempInputs[index] = {};
    }
    tempInputs[index][field] = value;
    setVariationInputs(tempInputs);
  };

  const delInner = (variationIndex, index) => {
    const tempArray = [...array];
    tempArray[variationIndex]?.items?.splice(index, 1);
    setArray(tempArray);
  };

  const delVariation = (index) => {
    const tempArray = [...array];
    tempArray?.splice(index, 1);
    setArray(tempArray);
  };

  return (
    <div>
      <span
        onClick={() => {
          if (name === "") {
            return toast.error("please provide variation name");
          }
          setArray((prev) => [...prev, { name }]);
          setName("");
        }}
        style={{
          cursor: "pointer",
          margin: "8px 0",
          display: "block",
          textAlign: "end",
        }}
      >
        + Add more
      </span>
      <NormalInput
        state={name}
        setState={setName}
        placeholder={"add Variation"}
      />
      {array?.map((item, variationIndex) => {
        return (
          <div key={variationIndex}>
            <div className="d-flex align-items-center justify-content-between mt-2 mb-1">
              <h6>{item?.name}</h6>
              <p onClick={() => delVariation(variationIndex)}>Del variation</p>
              <span
                onClick={() => {
                  SetInnerItems(variationIndex);
                }}
                style={{
                  cursor: "pointer",
                  margin: "8px 0",
                  display: "block",
                  textAlign: "end",
                }}
              >
                + Add more
              </span>
            </div>
            <Row>
              <Col md={6}>
                <NormalInput
                  state={variationInputs[variationIndex]?.label}
                  setState={(e) => {
                    handleVariationInputChange(variationIndex, "label", e);
                  }}
                  placeholder={"add label"}
                />
              </Col>
              <Col md={6}>
                <NormalInput
                  state={variationInputs[variationIndex]?.size}
                  setState={(e) => {
                    handleVariationInputChange(variationIndex, "size", e);
                  }}
                  placeholder={"add Size"}
                />
              </Col>
            </Row>
            {item?.items?.map((inner, innerIndex) => {
              return (
                <div className="d-flex align-items-center justify-content-between mt-2 mb-1">
                  <h6>{inner?.label}</h6>
                  <h6>{inner?.size}</h6>
                  <p onClick={() => delInner(variationIndex, innerIndex)}>
                    Del
                  </p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default AddMultiValueInput;
