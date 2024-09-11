interface StartButtonProps {
  handleStart: () => void;
}

export function StartButton({ handleStart }: StartButtonProps) {
  return (
    <button
      onClick={handleStart}
      className="bg-blue-500 text-white px-4 py-2 rounded">
      スタート
    </button>
  );
}
interface StopButtonProps {
  handleStop: () => void;
}

export function StopButton({ handleStop }: StopButtonProps) {
  return (
    <button
      onClick={handleStop}
      className="bg-red-500 text-white px-4 py-2 rounded">
      ストップ
    </button>
  );
}

interface ResetButtonProps {
  handleReset: () => void;
}

export function ResetButton({ handleReset }: ResetButtonProps) {
  return (
    <button
      onClick={handleReset}
      className="bg-gray-500 text-white px-4 py-2 rounded">
      リセット
    </button>
  );
}
