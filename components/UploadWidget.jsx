import React from "react";
import { StyledButton } from "./Style";

export default function UploadWidget({ onUpload }) {

  function openWidget() {
    if (!window.cloudinary) return;

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: "activity_image_upload",
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          onUpload(result.info.secure_url);
        }
      }
    );

    widget.open();
  }

  return (
    <StyledButton onClick={openWidget}>
      Upload Image
    </StyledButton>
  );
}