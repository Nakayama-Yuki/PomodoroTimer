"use client";

import { useState, useEffect } from "react";

export default function Timer() {
  const [time, setTime] = useState(2500);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  function handleStart() {
    setIsRunning(true);
  }

  function handleStop() {
    setIsRunning(false);
  }

  function handleReset() {
    setIsRunning(false);
    setTime(2500);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-6xl mb-4">{time}s</div>
      <div className="flex space-x-4">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="bg-blue-500 text-white px-4 py-2 rounded">
            Start
          </button>
        ) : (
          <button
            onClick={handleStop}
            className="bg-red-500 text-white px-4 py-2 rounded">
            Stop
          </button>
        )}
        <button
          onClick={handleReset}
          className="bg-gray-500 text-white px-4 py-2 rounded">
          Reset
        </button>
      </div>
    </div>
  );
}
