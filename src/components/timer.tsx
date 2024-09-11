"use client";

import { useState, useEffect } from "react";
import { StartButton, StopButton, ResetButton } from "@/components/button";

// 基本的なタイマー
// タイマーの時間をselectで選択できるようにする
// リセットボタンを押した時に選択した時間に戻す
export default function Timer() {
  const initialTime = 1500; // 初期値は25分＝1500秒
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
    setTime(initialTime); // 初期値に戻す todo
  }

  // 時間をMM:SS形式にフォーマットする関数
  // 引数はseconds秒数、返り値はstring文字列
  function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-6xl mb-4">{formatTime(focusTime)}</div>
      <div className="flex space-x-4">
        {!isRunning ? (
          <StartButton handleStart={handleStart} />
        ) : (
          <StopButton handleStop={handleStop} />
        )}
        <ResetButton handleReset={handleReset} />
      </div>
    </div>
  );
}
