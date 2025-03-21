interface StartButtonProps {
  handleStart: () => void;
}

export function StartButton({ handleStart }: StartButtonProps) {
  return (
    <button
      onClick={handleStart}
      className="bg-blue-500 text-white px-4 py-2 rounded-sm">
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
      className="bg-red-500 text-white px-4 py-2 rounded-sm">
      ストップ
    </button>
  );
}

interface ResetButtonProps {
  handleResetButtonClick: () => void;
}

export function ResetButton({ handleResetButtonClick }: ResetButtonProps) {
  return (
    <button
      onClick={handleResetButtonClick}
      className="bg-gray-500 text-white px-4 py-2 rounded-sm">
      リセット
    </button>
  );
}
