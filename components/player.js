"use client"; // Ensure the component runs on the client side

import React, { useRef, useEffect, useState } from "react";

export default function Player({ srcArray, onEnd }) {
  const audioRef = useRef(null);
  const [currentSrcIndex, setCurrentSrcIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    // Calculate total duration of all audio files
    const calculateTotalDuration = async () => {
      let total = 0;
      for (let i = 0; i < srcArray.length; i++) {
        const audio = new Audio(srcArray[i]);
        await new Promise((resolve) => {
          audio.addEventListener("loadedmetadata", () => {
            total += audio.duration;
            resolve();
          });
        });
      }
      setTotalDuration(total);
    };

    calculateTotalDuration();
  }, [srcArray]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();

      // Update progress
      const updateProgress = () => {
        if (audioRef.current) {
          const previousDuration = srcArray.slice(0, currentSrcIndex).reduce((sum, src) => {
            return sum + (new Audio(src).duration || 0);
          }, 0);
      
          const currentTime = audioRef.current.currentTime + previousDuration;
      
          if (totalDuration > 0) {
            setProgress((currentTime / totalDuration) * 100);
          }
        }
      };
      

      const handleAudioEnd = () => {
        if (currentSrcIndex < srcArray.length - 1) {
          setCurrentSrcIndex((prevIndex) => prevIndex + 1);
        } else {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          setCurrentSrcIndex(0);
          setProgress(0);
          onEnd(); // Trigger the end callback
        }
      };

      audioRef.current.addEventListener("timeupdate", updateProgress);
      audioRef.current.addEventListener("ended", handleAudioEnd);

      return () => {
        audioRef?.current?.removeEventListener("timeupdate", updateProgress);
        audioRef?.current?.removeEventListener("ended", handleAudioEnd);
      };
    }
  }, [currentSrcIndex, totalDuration]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = srcArray[currentSrcIndex];
      audioRef.current.play();
    }
  }, [srcArray, currentSrcIndex]);

  return (
    <div className="w-full">
      <audio ref={audioRef}>
        <source src={srcArray[currentSrcIndex]} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <progress
        className="progress progress-primary w-full"
        value={progress}
        max="100"
      ></progress>
    </div>
  );
}
