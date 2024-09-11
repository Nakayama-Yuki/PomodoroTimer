"use client";

import { useState, useEffect } from "react";

export default function Timer() {
  const initialTime = 2500; // 初期値は15分 25 * 60 = 1500
  const [focusTime, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && focusTime > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (focusTime === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, focusTime]);
  // スタートボタンを押した時の処理
  function handleStart() {
    setIsRunning(true);
  }
  // ストップボタンを押した時の処理
  function handleStop() {
    setIsRunning(false);
  }
  // リセットボタンを押した時の処理
  function handleReset() {
    setIsRunning(false);
    setTime(initialTime);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-6xl mb-4">{focusTime}s</div>
      <div className="flex space-x-4">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="bg-blue-500 text-white px-4 py-2 rounded">
            スタート
          </button>
        ) : (
          <button
            onClick={handleStop}
            className="bg-red-500 text-white px-4 py-2 rounded">
            ストップ
          </button>
        )}
        <button
          onClick={handleReset}
          className="bg-gray-500 text-white px-4 py-2 rounded">
          リセット
        </button>
      </div>
    </div>
  );
}
