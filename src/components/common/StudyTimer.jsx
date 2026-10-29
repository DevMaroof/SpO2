import { useState, useRef, useCallback, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer } from 'lucide-react';

function formatElapsed(totalSeconds) {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  return [
    String(hrs).padStart(2, '0'),
    String(mins).padStart(2, '0'),
    String(secs).padStart(2, '0'),
  ].join(':');
}

export default function StudyTimer({
  onTimeRecorded,
  blockName = 'Study',
  targetMinutes,
}) {
  const [elapsed, setElapsed] = useState(0); // seconds
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const accumulatedRef = useRef(0);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const start = useCallback(() => {
    if (isRunning) return;
    setIsRunning(true);
    startTimeRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      const delta = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setElapsed(accumulatedRef.current + delta);
    }, 1000);
  }, [isRunning]);

  const pause = useCallback(() => {
    if (!isRunning) return;
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    const delta = Math.floor((Date.now() - startTimeRef.current) / 1000);
    accumulatedRef.current += delta;
    setElapsed(accumulatedRef.current);
  }, [isRunning]);

  const reset = useCallback(() => {
    // Record time before resetting if there is any
    if (elapsed > 0 && onTimeRecorded) {
      const minutes = Math.round(elapsed / 60);
      if (minutes > 0) {
        onTimeRecorded(minutes);
      }
    }
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    accumulatedRef.current = 0;
    setElapsed(0);
  }, [elapsed, onTimeRecorded]);

  const handleStop = useCallback(() => {
    pause();
    if (elapsed > 0 && onTimeRecorded) {
      const minutes = Math.round(elapsed / 60);
      if (minutes > 0) {
        onTimeRecorded(minutes);
      }
    }
  }, [pause, elapsed, onTimeRecorded]);

  const targetSeconds = targetMinutes ? targetMinutes * 60 : null;
  const progress = targetSeconds ? Math.min(100, (elapsed / targetSeconds) * 100) : null;

  return (
    <div className="card p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <Timer className="w-4 h-4 text-primary-500" />
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {blockName} Timer
        </h3>
      </div>

      {/* Time Display */}
      <div className="text-center mb-4">
        <div
          className="font-mono text-3xl font-bold text-gray-900 dark:text-gray-100 tabular-nums tracking-wider"
          role="timer"
          aria-label={`Elapsed time: ${formatElapsed(elapsed)}`}
        >
          {formatElapsed(elapsed)}
        </div>

        {/* Target Duration Display */}
        {targetSeconds && (
          <div className="mt-2">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Target: {targetMinutes}min
            </div>
            <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-linear ${
                  progress >= 100
                    ? 'bg-green-500'
                    : 'bg-primary-500'
                }`}
                style={{ width: `${Math.min(100, progress)}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        {!isRunning ? (
          <button
            onClick={start}
            className="flex items-center gap-2 btn-primary py-2 px-5"
            aria-label="Start timer"
          >
            <Play className="w-4 h-4" />
            {elapsed > 0 ? 'Resume' : 'Start'}
          </button>
        ) : (
          <button
            onClick={pause}
            className="flex items-center gap-2 btn-warning py-2 px-5"
            aria-label="Pause timer"
          >
            <Pause className="w-4 h-4" />
            Pause
          </button>
        )}

        {elapsed > 0 && !isRunning && (
          <button
            onClick={handleStop}
            className="flex items-center gap-2 btn-success py-2 px-4"
            aria-label="Save recorded time"
          >
            Save
          </button>
        )}

        <button
          onClick={reset}
          className="p-2 rounded-lg text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Reset timer"
          title="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
