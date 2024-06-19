"use client";
import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import type { QrcodeErrorCallback, QrcodeSuccessCallback } from "html5-qrcode";
import type { CurrentUser } from "~/types/types";
import { QRScannerProps } from "~/types/props";
import { Html5QrcodeScannerConfig } from "html5-qrcode/esm/html5-qrcode-scanner";

const QRScanner = ({ addUser }: QRScannerProps) => {
  const qrCodeRegionId = "html5qr-code-full-region";

  useEffect(() => {
    const config: Html5QrcodeScannerConfig = {
      fps: 10,
      disableFlip: true,
      qrbox: { width: 250, height: 250 },
    };

    const onSSuccess: QrcodeSuccessCallback = (decodedString: string) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const User: CurrentUser = JSON.parse(decodedString);
      addUser((prev) => [...prev, User]);
    };

    const onSF: QrcodeErrorCallback = () => {
      return;
    };

    const qrCodeScanner = new Html5QrcodeScanner(qrCodeRegionId, config, false);
    qrCodeScanner.render(onSSuccess, onSF);
  }, [addUser]);

  return <div id={qrCodeRegionId}></div>;
};

export default QRScanner;
