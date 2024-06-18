import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Result } from "@zxing/library";
import { BrowserMultiFormatReader } from "@zxing/browser";

type ScannerProps = {
  onUpdate: (error: unknown, data?: Result) => void;
  onError?: (error: string | DOMException) => void;
  width?: number | string;
  height?: number | string;
  facingMode?: "environment" | "user";
  torch?: boolean;
  delay?: number;
  videoConstraints?: MediaTrackConstraints;
  stopStream?: boolean;
};

type ScannerState = "idle" | "scanning" | "success" | "error";

export const Scanner = ({
  onUpdate,
  onError,
  width = "100%",
  height = "100%",
  facingMode = "environment",
  delay = 500,
  videoConstraints,
}: ScannerProps) => {
  const webcamRef = useRef<Webcam>(null);
  const [scannerState, setScannerState] = useState<ScannerState>("idle");
  const [ImageURL, setImageURL] = useState("");

  const handleCapture = useCallback(() => {
    const reader = new BrowserMultiFormatReader();
    const imageSrc = webcamRef.current?.getScreenshot();

    if (imageSrc) {
      setScannerState("scanning");

      const img = new Image();
      img.src = imageSrc;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (context) {
          const qrBoxSize = 200;
          const qrBoxX = (img.width - qrBoxSize) / 2;
          const qrBoxY = (img.height - qrBoxSize) / 2;

          canvas.width = qrBoxSize;
          canvas.height = qrBoxSize;

          context.drawImage(
            img,
            qrBoxX,
            qrBoxY,
            qrBoxSize,
            qrBoxSize,
            0,
            0,
            qrBoxSize,
            qrBoxSize,
          );

          // Convert the canvas to a data URL
          const croppedImage = canvas.toDataURL("image/jpeg");
          setImageURL("/ABIQR.png");
          reader
            .decodeFromImageUrl("/ABIQR.png")
            .then((res) => {
              setScannerState("success");
              onUpdate(null, res);
            })
            .catch((e) => {
              setScannerState("error");
              onUpdate(e);
            });
        }
      };

      img.onerror = (e) => {
        setScannerState("error");
        onUpdate(e);
      };
    }
  }, [onUpdate]);

  useEffect(() => {
    const interval = setInterval(handleCapture, delay);

    return () => {
      clearInterval(interval);
    };
  }, [handleCapture, delay]);

  return (
    <div style={{ position: "relative", width, height }}>
      <Webcam
        mirrored
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints ?? { facingMode }}
        audio={false}
        onUserMediaError={onError}
      />

      <img src="/ABIQR.png" alt="ahay" />
      <div style={qrBoxStyle}></div>
      <div style={scannerStateStyle}>
        <p>Scanner State: {scannerState}</p>
      </div>
    </div>
  );
};

const qrBoxStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  width: "200px",
  height: "200px",
  marginTop: "-230px", // half of the height
  marginLeft: "-100px", // half of the width
  border: "2px solid red",
  boxSizing: "border-box" as const,
  zIndex: 2,
};

const scannerStateStyle = {
  position: "absolute" as const,
  bottom: "10px",
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: "white",
  padding: "5px 10px",
  borderRadius: "5px",
  zIndex: 2,
};
