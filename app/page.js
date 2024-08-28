"use client";

import { useState } from "react";
import { Player } from "@/components";
import SimpleAudioPlayer from "@/components/player";

export default function Home() {
  const audioFiles = [
    "/assets/audios/112-al-ikhlas.mp3",
    "/assets/audios/107-al-maun.mp3",
    // Add more audio file paths here
  ];

  const [playAudio, setPlayAudio] = useState(false);

  const handlePlayButtonClick = () => {
    setPlayAudio(true);
  };

  return (
    <main>
      <SimpleAudioPlayer src="/assets/audios/112-al-ikhlas.mp3" triggerPlay={playAudio} />
      <button onClick={handlePlayButtonClick}>Play Audio</button>
    </main>
  );

}
