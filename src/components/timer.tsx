// todo
// TSの型定義を追加して、整理する
"use client";

import { useState, useEffect } from "react";
import TimerDisplay from "@/components/TimerDisplay";
import { StartButton, StopButton, ResetButton } from "@/components/button";

// ポモドーロタイマー
export default function Timer() {
  const [focusTime, setFocusTime] = useState(1500); // 初期値は25分＝1500秒
  const [restTime, setRestTime] = useState(300); //初期値は５分=300秒
  const [isRunning, setIsRunning] = useState(false);
  const [isFocus, setIsFocus] = useState(true); // 初期はfocusTimer

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      if (isFocus && focusTime > 0) {
        timer = setInterval(() => {
          setFocusTime((prevTime) => prevTime - 1);
        }, 1000); // 1秒(1s=1000ms)ごとに実行する
      } else if (!isFocus && restTime > 0) {
        timer = setInterval(() => {
          setRestTime((prevTime) => prevTime - 1);
        }, 1000);
      } else if (isFocus && focusTime === 0) {
        setIsFocus(false);
        const restSelect = document.getElementById(
          "restTime"
        ) as HTMLSelectElement;
        setRestTime(Number(restSelect.value)); // 選択された休憩時間にリセット
        const focusSelect = document.getElementById(
          "focusTime"
        ) as HTMLSelectElement;
        setFocusTime(Number(focusSelect.value)); // 選択された集中時間にリセット
      } else if (!isFocus && restTime === 0) {
        setIsFocus(true);
        const focusSelect = document.getElementById(
          "focusTime"
        ) as HTMLSelectElement;
        setFocusTime(Number(focusSelect.value)); // 選択された集中時間にリセット
        const restSelect = document.getElementById(
          "restTime"
        ) as HTMLSelectElement;
        setRestTime(Number(restSelect.value)); // 選択された休憩時間にリセット
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, isFocus, focusTime, restTime]);

  // 集中する時間を選択した時間に変更する関数
  function handleFocusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setFocusTime(Number(e.target.value));
  }
  // 休憩する時間を選択した時間に変更する関数
  function handleRestChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setRestTime(Number(e.target.value));
  }

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
    const focusSelect = document.getElementById(
      "focusTime"
    ) as HTMLSelectElement;
    const restSelect = document.getElementById("restTime") as HTMLSelectElement;
    // 選択された時間（数字）にする
    setFocusTime(Number(focusSelect.value));
    setRestTime(Number(restSelect.value));
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
      <h1 className="text-4xl mb-4">ポモドーロタイマー</h1>
      <TimerDisplay
        isRunning={isRunning}
        isFocus={isFocus}
        focusTime={focusTime}
        restTime={restTime}
        handleFocusChange={handleFocusChange}
        handleRestChange={handleRestChange}
        formatTime={formatTime}
      />
      <div className="flex space-x-4 m-5">
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
