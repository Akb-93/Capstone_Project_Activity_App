import { StyledButton } from "./StyledComponents";
import { useEffect, useRef, useState } from "react";

export default function UploadWidget({ onUpload }) {
  const widgetRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkInterval = setInterval(() => {
      if (window.cloudinary) {
        clearInterval(checkInterval);

        widgetRef.current = window.cloudinary.createUploadWidget(
          {
            cloudName: "dvy65gcrf",
            uploadPreset: "activity_image_upload",
          },
          function (error, result) {
            if (!error && result.event === "success") {
              onUpload(result.info.secure_url);
            }
          }
        );

        setIsReady(true);
      }
    }, 500);

    return () => clearInterval(checkInterval);
  }, [onUpload]);

  function handleClick() {
    if (widgetRef.current) {
      widgetRef.current.open();
    } else {
      console.error("Widget not ready yet.");
    }
  }

  return (
    <StyledButton type="button" $variant="outlined" onClick={handleClick} disabled={!isReady}>
      {isReady ? "Upload Image" : "Loading..."}
    </StyledButton>
  );
}
