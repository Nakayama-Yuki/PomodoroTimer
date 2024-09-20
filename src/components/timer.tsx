"use client";

import { useState, useEffect } from "react";
import { StartButton, StopButton, ResetButton } from "@/components/button";

// ポモドーロタイマー
// リセットボタンを押した時に選択した時間に戻す
// タイマーが0になった時にアラートを表示する
export default function Timer() {
  const [focusTime, setFocusTime] = useState(1500); // 初期値は25分＝1500秒
  const [restTime, setRestTime] = useState(300); //初期値は５分
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && focusTime > 0) {
      timer = setInterval(() => {
        setFocusTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (focusTime === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, focusTime]);

  // 集中する時間を選択した時間に変更する関数
  const handleFocusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFocusTime(Number(event.target.value));
  };
  // 休憩する時間を選択した時間に変更する関数
  const handleRestChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRestTime(Number(event.target.value));
  };

  // スタートボタンを押した時の処理
  function handleStart() {
    setIsRunning(true);
  }

  // ストップボタンを押した時の処理
  function handleStop() {
    setIsRunning(false);
  }

  // リセットボタンを押した時の処理
  const handleReset = () => {
    setIsRunning(false);
    const focusSelect = document.getElementById(
      "focusTime"
    ) as HTMLSelectElement;
    const restSelect = document.getElementById("restTime") as HTMLSelectElement;
    setFocusTime(Number(focusSelect.value));
    setRestTime(Number(restSelect.value));
  };

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
      <h1 className="text-4xl mb-4 ">ポモドーロタイマー</h1>
      <div>
        <label htmlFor="focusTime">集中する時間</label>
        <select name="focus" id="focusTime" onChange={handleFocusChange}>
          <option value="1800">30分</option>
          <option value="1500" selected>
            25分
          </option>
          <option value="900">15分</option>
        </select>
        <label htmlFor="restTime">休憩する時間</label>
        <select name="rest" id="restTime" onChange={handleRestChange}>
          <option value="300">5分</option>
          <option value="600">10分</option>
          <option value="900">15分</option>
        </select>
      </div>
      <div className="text-6xl mb-4">{formatTime(focusTime)}</div>
      <div className="text-6xl mb-4">{formatTime(restTime)}</div>
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
