import React, { useCallback, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import { Result } from '@zxing/library';
import { BrowserMultiFormatReader } from '@zxing/browser';

type ScannerProps = {
  onUpdate: (error: unknown, data?: Result) => void;
  onError?: (error: string | DOMException) => void;
  width?: number | string;
  height?: number | string;
  facingMode?: 'environment' | 'user';
  torch?: boolean;
  delay?: number;
  videoConstraints?: MediaTrackConstraints;
  stopStream?: boolean;
};

export const Scanner = ({
  onUpdate,
  onError,
  width = '100%',
  height = '100%',
  facingMode = 'environment',
  delay = 500,
  videoConstraints,
}: ScannerProps) => {
  const webcamRef = useRef(null);

  const handleCapture = useCallback(() => {
    const reader = new BrowserMultiFormatReader();
    // @ts-ignore
    const imageSrc = webcamRef?.current?.getScreenshot();

    if (imageSrc) {
      reader
        .decodeFromImageUrl(imageSrc)
        .then(res => {
          onUpdate(null, res);
        })
        .catch(e => {
          onUpdate(e);
        });
    }
  }, [onUpdate]);

  useEffect(() => {
    const interval = setInterval(handleCapture, delay);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Webcam
      width={width}
      height={height}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      videoConstraints={videoConstraints ?? { facingMode }}
      audio={false}
      onUserMediaError={onError}
    />
  );
};
