import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import classes from "./MultiFiles.module.css";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";

const MultiFileUploader = ({ files, setFiles, acceptedTypes }) => {
  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    onDropRejected: () => {
      return toast.warn("Invalid file type");
    },
  });
  return (
    <div>
      <div {...getRootProps()} className={classes.mainDiv}>
        <input {...getInputProps()} />
        {files?.length > 0 ? (
          <div className={classes.mainImgDiv}>
            {files?.map((item, index) => {
              return (
                <div className={classes.imgDiv}>
                  <img src={URL.createObjectURL(item)} alt="..." />
                  <RxCross2
                    className={classes.cancelIcon}
                    size={20}
                    onClick={(e) => {
                      e?.stopPropagation();
                      const tempFiles = [...files];
                      tempFiles?.splice(index, 1);
                      setFiles(tempFiles);
                    }}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
    </div>
  );
};

export default MultiFileUploader;
