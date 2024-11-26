// TimerDisplay.tsx
interface TimerDisplayProps {
  isRunning: boolean;
  isFocus: boolean;
  focusTime: number;
  restTime: number;
  handleFocusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleRestChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  formatTime: (time: number) => string;
}

export default function TimerDisplay({
  isRunning,
  isFocus,
  focusTime,
  restTime,
  handleFocusChange,
  handleRestChange,
  formatTime,
}: TimerDisplayProps) {
  return (
    <div className="flex space-x-8">
      <div
        className={`border-2 p-2 ${
          isRunning && isFocus ? "border-dashed border-green-500" : ""
        }`}>
        <label htmlFor="focusTime">集中する時間</label>
        <select
          name="focus"
          id="focusTime"
          defaultValue="1500"
          onChange={handleFocusChange}>
          <option value="1800">30分</option>
          <option value="1500">25分</option>
          <option value="900">15分</option>
        </select>
        <div className="text-6xl mb-4">{formatTime(focusTime)}</div>
      </div>
      <div
        className={`border-2 p-2 ${
          isRunning && !isFocus ? "border-dashed border-green-500" : ""
        }`}>
        <label htmlFor="restTime">休憩する時間</label>
        <select
          name="rest"
          id="restTime"
          defaultValue="300"
          onChange={handleRestChange}>
          <option value="300">5分</option>
          <option value="600">10分</option>
          <option value="900">15分</option>
        </select>
        <div className="text-6xl mb-4">{formatTime(restTime)}</div>
      </div>
    </div>
  );
}
