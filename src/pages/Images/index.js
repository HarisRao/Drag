import React, { useState } from "react";
import classes from "./Images.module.css";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const imgUrl = "https://pro-mls-portal.s3.amazonaws.com/";

const imageArray = [
  "eede55a7-4ca8-40d8-b520-35597560b28c.png",
  "b77dde01-bc21-4615-9349-85af2183f720.png",
  "27426c67-6672-4b7d-a827-0d583cbbcc6a.png",
  "db1080a1-455c-429a-8147-11d754a5c397.png",
  "be81763d-38e8-411f-a7b7-32c20df83e0a.png",
  "7ed10b33-0bac-4c1b-9246-7fabdcd685f0.png",
  "65aef0d3-3f7e-48e5-b7ac-bc38ca5c8084.png",
  "d8913b9d-7005-41d4-922c-67dd7fd88dc7.png",
  "0b88d540-75d4-4478-bc59-ba5cf9b384d2.png",
  "b1155576-94fe-4b4a-b6fe-40b747c24549.png",
  "2815e630-738d-42b2-810d-01804a26dabc.png",
  "4426a31a-0a24-4d62-b097-26bf09dd0f1f.png",
  "23160154-e96f-4667-99ea-2c8a9ea7ad09.png",
  "53b74e91-4e9a-45ec-8edd-255dd58325c8.png",
  "a877e9fc-9212-4c67-a26e-8844fff9f4cd.png",
  "15e73be8-b3db-409e-b6a6-65ed1ed5f18e.png",
  "2f045671-f006-48df-9f05-14de669fd691.png",
  "5c162ae6-91b8-4ce6-b146-8cde6e7010fe.png",
  "eddc595c-350e-4feb-b44e-68ec66890123.png",
  "8c1a2d7f-e1e1-4aa9-81d5-42778e728f86.png",
  "9e73032b-7e47-4219-bdff-3512fce06e2f.png",
  "902af63b-f458-4345-bef7-397057b6cf1e.png",
  "cf9dd67c-32be-4330-9793-ae86cd8048df.png",
  "288f3130-7b8a-4fc9-9e73-4d450f123dbe.png",
  "7f8368ba-8629-4e69-860c-4e7402523911.png",
  "32500431-0de0-4342-80e8-771b7f03d0c4.png",
  "8d64e6a6-d8f3-49aa-a508-000d53a371f9.png",
  "05b919aa-cdce-45f6-aee8-bde3ee1df991.png",
  "aa0f61ea-e5bf-4105-aa1b-6cdd6f3104d3.png",
  "04b4a13a-a9f1-4919-9de8-76630f5ef65a.png",
  "ae114cea-233f-48c8-9f42-5aaba7837f53.png",
  "95d06739-c55f-4049-a56d-dd450b559fde.png",
  "04946362-a0ef-4a51-be44-401ebf8cb78c.png",
  "9307f3b2-208a-4291-83bc-9bd184466d14.png",
  "1d964ddc-4ff1-4a4e-836e-ef41e53a76f8.png",
  "4ac0811b-82c3-4835-8f2e-ae4fbe5ff333.png",
  "bb0cd47a-c883-4fcf-8ade-ee50e65bbef0.png",
  "326a14fc-2dc4-4ada-b6da-04be71b6f8e8.png",
  "b6ad4878-70ff-4d65-ac79-2a310ff8aca3.png",
];

// Drag Item Type
const ItemType = "IMAGE";

// Image Component
const DraggableImage = ({ image, index, moveImage }) => {
  const [{ isDragging }, ref] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        // Temporarily highlight the target position
        // You could use this to show where the item will go
      }
    },
    drop: (draggedItem) => {
      if (draggedItem.index !== index) {
        // Reorder images only when the item is dropped
        moveImage(draggedItem.index, index);
        draggedItem.index = index; // Update the index of the dragged item
      }
    },
  });

  return (
    <div
      ref={(node) => ref(drop(node))}
      style={{
        margin: "5px",
        display: "inline-block",
        opacity: isDragging ? 0.5 : 1,
        transition: "opacity 0.2s ease",
        cursor: "grab",
      }}
    >
      <img
        src={`${imgUrl}${image}`}
        alt={`Image ${index}`}
        style={{ width: "100px", height: "100px" }}
      />
    </div>
  );
};

const Images = () => {
  const [images, setImages] = useState(imageArray);

  const moveImage = (fromIndex, toIndex) => {
    if (fromIndex === toIndex) return; // No movement needed if indices are the same

    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(fromIndex, 1); // Remove the image from its original position
    updatedImages.splice(toIndex, 0, movedImage); // Insert the image into the new position

    setImages(updatedImages);
  };
  return (
    <div className="container m-5 p-5">
      <DndProvider backend={HTML5Backend}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            height: "400px",
            overflowY: "auto",
          }}
        >
          {images.map((image, index) => (
            <DraggableImage
              key={image}
              index={index}
              image={image}
              moveImage={moveImage}
            />
          ))}
        </div>
      </DndProvider>
    </div>
  );
};

export default Images;
