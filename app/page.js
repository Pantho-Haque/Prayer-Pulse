"use client";

import { Player } from "@/components";
import { useState } from "react";

export default function Home() {
  const audioFiles = [
    "/assets/audios/allah-hu-akbar.mp3",
    "/assets/audios/112-al-ikhlas.mp3",
    "/assets/audios/107-al-maun.mp3",
    "/assets/audios/allah-hu-akbar.mp3",
    "/assets/audios/subhana-rabbil-ajim.mp3",
    "/assets/audios/allah-hu-akbar.mp3",
    "/assets/audios/subhana-rabbil-ala.mp3",
    "/assets/audios/rabbig-firli.mp3",
    "/assets/audios/subhana-rabbil-ala.mp3",
    // Add more audio file paths here
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [playAudio, setPlayAudio] = useState(false);

  const handlePlayButtonClick = () => {
    setPlayAudio(true);
  };

  const handleAudioEnd = () => {
    if (currentIndex < audioFiles.length - 1) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 2000);
    } else {
      setPlayAudio(false); // Stop playback after the last file
      setCurrentIndex(0);  // Reset to the first file
    }
  };

  return (
    <main>
      {playAudio && (
        <Player
          src={audioFiles[currentIndex]}
          onEnded={handleAudioEnd}
        />
      )}

      <button onClick={handlePlayButtonClick} disabled={playAudio}>
        Play Audio
      </button>
    </main>
  );
}
