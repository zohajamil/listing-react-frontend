import React, { useRef } from "react";
import { ProgressBar } from "react-bootstrap";
import { FilePickerProps } from "../Interfaces/Interfaces";

export default function FilePicker(props: FilePickerProps) {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (hiddenFileInput.current !== null) {
      hiddenFileInput.current.click();
    }
  };

  const fileSelectedHandler = (event: any) => {
    if (event.target.files.length > 0) {
      props.setFileSelected(event.target.files[0]);
    }
  };

  return (
    <>
      {props.pictureUrl.length === 0 && (
        <button
          onClick={(e) => handleClick(e)}
          className={"purple-button btn"}
        >Choose Picture</button>
      )}

      {props.fileSelected.name && (
        <p className="text-center">
          <span className="purple-color fw-bold">
            {props.fileSelected.name}
          </span>{" "}
          &nbsp;is selected
        </p>
      )}

      <input
        type="file"
        className="mt-2 d-none"
        onChange={(e) => fileSelectedHandler(e)}
        accept="image/*"
        ref={hiddenFileInput}
      ></input>
      {props.isUploading && (
        <ProgressBar
          striped
          now={props.uploadProgress}
          label={`${props.uploadProgress}%`}
        />
      )}
      {props.pictureUrl.length > 0 && !props.fileSelected.name && (
        <div className="img-container position-relative w-100 mt-3">
          <img src={props.pictureUrl} className="w-100" alt={props.name} />
          <button
            className="btn gray-button rounded-pill"
            onClick={(e) => handleClick(e)}
          >
            Change Picture
          </button>
        </div>
      )}
    </>
  );
}
