"use client";

import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";
const ImagePicker = ({ label, name }) => {
  const imageInput = useRef();
  const [pickedImage, setPickedImage] = useState(null);
  const handlePickClick = (e) => {
    imageInput.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}

          {pickedImage && <Image fill src={pickedImage} alt="" />}
        </div>
        <input
          required
          ref={imageInput}
          className={classes.input}
          type="file"
          name={name}
          id={name}
          accept="image/png,image/jpeg"
          onChange={handleImageChange}
        />
      </div>
      <button
        className={classes.button}
        type="button"
        onClick={handlePickClick}
      >
        Pick an image
      </button>
    </div>
  );
};

export default ImagePicker;
