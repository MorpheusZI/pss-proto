"use client";
import React, { useEffect } from "react";
import "../../../styles/qrstyles.css";
import { Html5QrcodeScanner } from "html5-qrcode";
import type { QrcodeErrorCallback, QrcodeSuccessCallback } from "html5-qrcode";
import type { CurrentUser, QRScannerProps } from "~/types/types";

const QRScanner = ({ addUser }: QRScannerProps) => {
  const qrCodeRegionId = "html5qr-code-full-region";

  useEffect(() => {
    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    };

    const onSSuccess: QrcodeSuccessCallback = (decodedString, res) => {
      const User: CurrentUser = JSON.parse(decodedString);
      addUser((prev) => [...prev, User]);
    };

    const onSF: QrcodeErrorCallback = () => {
      return;
    };

    const qrCodeScanner = new Html5QrcodeScanner(qrCodeRegionId, config, false);
    qrCodeScanner.render(onSSuccess, onSF);
  }, []);

  return <div id={qrCodeRegionId}></div>;
};

export default QRScanner;
