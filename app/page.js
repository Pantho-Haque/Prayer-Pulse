"use client";

import { useState } from "react";
import {Player} from "@/components";

export default function Home() {
  const audioFiles = [
    "/assets/audios/112-al-ikhlas.mp3",
    "/assets/audios/107-al-maun.mp3",
    // Add more audio file paths here
  ];

  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleEnd = () => {
    setIsPlaying(false);
  };

  return (
    <main>
      <Player srcArray={audioFiles} onEnd={handleEnd} />
      <button
        onClick={handlePlay}
        disabled={isPlaying}
        className="btn btn-primary mt-4"
      >
        {isPlaying ? "Playing..." : "Play Audio"}
      </button>
    </main>
  );
}
