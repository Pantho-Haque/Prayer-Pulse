"use client";

import React, { useRef, useEffect } from "react";

export default function Player({ src, onEnded }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
      audioRef.current.addEventListener("ended", onEnded);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", onEnded);
      }
    };
  }, [src]);

  return <audio ref={audioRef} src={src} />;
}
