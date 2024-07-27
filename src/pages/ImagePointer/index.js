import React from "react";
import { useRef } from "react";
import img1 from "../../assets/images/profile-img.jpg";
import { useState } from "react";

const ImagePointer = () => {
  const [parts, setParts] = useState([]);
  const [description, setDescription] = useState("");
  const [coordinates, setCoordinates] = useState({ x: null, y: null });
  const [selectedPartIndex, setSelectedPartIndex] = useState(null);
  const imageRef = useRef(null);

  const handleAddPart = () => {
    const part = { coordinates, description };
    setParts([...parts, part]);
    setDescription("");
    setCoordinates({ x: null, y: null });
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePartClick = (index) => {
    setSelectedPartIndex(index);
  };
  return (
    <div>
      <img
        src={img1}
        alt="image"
        ref={imageRef}
        onClick={(event) => {
          const x = event.nativeEvent.offsetX;
          const y = event.nativeEvent.offsetY;
          setCoordinates({ x, y });
        }}
      />
      {coordinates.x && (
        <div
          style={{
            position: "absolute",
            left: coordinates.x,
            top: coordinates.y,
          }}
          onClick={() => handlePartClick(parts.length)}
        >
          <div
            style={{
              borderRadius: "50%",
              background: "white",
              padding: "5px",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            {parts.length + 1}
          </div>
        </div>
      )}
      {parts.map((part, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: part.coordinates.x,
            top: part.coordinates.y + 30,
          }}
          onClick={() => handlePartClick(index)}
        >
          {index + 1}. {part.description}
        </div>
      ))}
      {/* </div> */}
      {selectedPartIndex !== null && (
        <div style={{ marginTop: "20px" }}>
          <input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
          />
          <button onClick={handleAddPart}>Add Part</button>
        </div>
      )}
    </div>
  );
};

export default ImagePointer;
