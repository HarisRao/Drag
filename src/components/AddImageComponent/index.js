import React, { useEffect, useRef, useState } from "react";
import classes from "./AddImageComponent.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
const AddImageComponent = ({
  isAddEmpty,
  initialState,
  item,
  index,
  handleSubmit,
}) => {
  const inputRef = useRef(null);
  const [innerImages, setInnerImages] = useState(initialState || [{}, {}]);

  useEffect(() => {
    setInnerImages(initialState);
  }, [initialState]);

  const getImage = () => {
    inputRef.current.click();
  };

  const handleAddImageBox = () => {
    const tempImages = [...innerImages];
    tempImages.push({});
    setInnerImages(tempImages);
    handleSubmit(tempImages);
  };
  const handleAddImage = (e) => {
    const tempImages = [...innerImages];
    tempImages.splice(index, 1, e.target.files[0]);
    setInnerImages(tempImages);
    handleSubmit(tempImages);
  };

  const handleRemove = () => {
    const tempImages = [...innerImages];
    tempImages.splice(index, 1);
    setInnerImages(tempImages);
    handleSubmit(tempImages);
  };
  return (
    <div>
      {isAddEmpty ? (
        <div onClick={handleAddImageBox} className={classes.addImageDiv}>
          <AiOutlinePlusCircle size={24} color={"#000"} />
        </div>
      ) : item?.name ? (
        <div className={classes.addImageDiv}>
          <img src={URL.createObjectURL(item)} alt="..." />
          <AiOutlinePlusCircle
            size={24}
            color={"#000"}
            className={classes.cancelIcon}
            onClick={handleRemove}
          />
        </div>
      ) : typeof item == "string" ? (
        <div className={classes.addImageDiv}>
          <img src={item} alt="..." />
        </div>
      ) : (
        <div className={classes.addImageDiv} onClick={getImage}>
          upload
          <AiOutlinePlusCircle
            size={24}
            color={"#000"}
            className={classes.cancelIcon}
            onClick={(e) => {
              e.stopPropagation();
              handleRemove();
            }}
          />
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        onChange={(e) => handleAddImage(e)}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default AddImageComponent;
