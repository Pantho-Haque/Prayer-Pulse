"use client"; // Ensure the component runs on the client side

import React, { useRef, useEffect } from "react";

export default function SimpleAudioPlayer({ src, triggerPlay }) {
  const audioRef = useRef(null);

  useEffect(() => {
    const handleAudioEnd = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Reset to the start
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("ended", handleAudioEnd);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleAudioEnd);
      }
    };
  }, []);

  useEffect(() => {
    if (triggerPlay && audioRef.current) {
      audioRef.current.play();
    }
  }, [triggerPlay]);

  return <audio ref={audioRef} src={src} />;
}
