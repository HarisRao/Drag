import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import EXIF from "exif-js";
import exifr from "exifr";

const ImageUploader = () => {
  const [validImages, setValidImages] = useState([]);
  const [invalidImages, setInvalidImages] = useState([]);

  const handleDrop = (files) => {
    const newImages = [...files];
    handleImages(newImages);
  };

  const handleImages = async (newImages) => {
    newImages.forEach((image) => {
      const img = new Image();
      img.src = URL.createObjectURL(image);

      img.onload = async () => {
        const dpi = await getDpiFromImage(img);
        console.log(dpi, "dpi");
        if (img.width >= 1620 && img.height >= 1080) {
          setValidImages((prevValidImages) => [...prevValidImages, image]);
        } else {
          setInvalidImages((prevInvalidImages) => [
            ...prevInvalidImages,
            image,
          ]);
        }
      };
    });
  };

  const getDpiFromImage = async (image) => {
    const exifData = await exifr.parse(image, true);
    console.log(exifData, "exifData");
    try {
      if (exifData && exifData.XResolution) {
        const dpi = exifData.XResolution;
        const width = image.width;
        const height = image.height;
        return {dpi,width,height};
      }
    } catch (error) {
      console.error("Error extracting EXIF data:", error);
    }
    return null;
  };

  const fileTypes = ["JPG", "PNG", "JPEG"];
  return (
    <div>
      <FileUploader handleChange={handleDrop} multiple types={fileTypes}>
        <div
          style={{
            border: "2px dashed #ccc",
            borderRadius: "5px",
            padding: "20px",
            marginBottom: "10px",
            cursor: "pointer",
          }}
        >
          <p>
            Drag and drop images here or click to select images.Images size
            should greater than 1620 * 1080
          </p>
        </div>
      </FileUploader>

      <div>
        {validImages.map((image, index) => (
          <div key={index}>
            <img
              src={URL.createObjectURL(image)}
              alt={`Uploaded ${index}`}
              style={{ width: "200px", height: "auto", margin: "5px" }}
            />
            <span
              onClick={() => {
                const temp = [...validImages];
                temp.splice(index, 1);
                setValidImages(temp);
              }}
            >
              del
            </span>
          </div>
        ))}
      </div>

      <div>
        <h2>In Valid Images</h2>
        {invalidImages.map((image, index) => (
          <div key={index}>
            <img
              src={URL.createObjectURL(image)}
              alt={`Uploaded ${index}`}
              style={{ width: "200px", height: "auto", margin: "5px" }}
            />
            <span
              onClick={() => {
                const temp = [...invalidImages];
                temp.splice(index, 1);
                setInvalidImages(temp);
              }}
            >
              del
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;

const analyzeImageDpi = (image) => {
  const dpiFromMetadata = extractDpiFromMetadata(image);
  if (dpiFromMetadata) {
    return dpiFromMetadata;
  }

  // If no embedded DPI metadata, calculate DPI based on natural dimensions
  const dpiX = image.naturalWidth / (image.width || 1);
  const dpiY = image.naturalHeight / (image.height || 1);
  const averageDpi = (dpiX + dpiY) / 2;
  return averageDpi;
};

const extractDpiFromMetadata = (image) => {
  const exifData = EXIF.readFromBinaryFile(image.src);
  if (exifData && exifData.XResolution) {
    // XResolution in EXIF data typically represents DPI
    return exifData.XResolution;
  }
  return null;
};
