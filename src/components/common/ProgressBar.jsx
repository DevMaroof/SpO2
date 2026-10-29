import { useMemo } from 'react';

const SIZE_CLASSES = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

export default function ProgressBar({
  value = 0,
  color = 'bg-primary-500',
  size = 'md',
  label,
  showPercentage = false,
  segments,
  className = '',
}) {
  const clampedValue = Math.min(100, Math.max(0, value));
  const heightClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;

  const segmentData = useMemo(() => {
    if (!segments || !Array.isArray(segments) || segments.length === 0) return null;
    return segments;
  }, [segments]);

  return (
    <div className={`w-full ${className}`}>
      {/* Label and percentage row */}
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-1">
          {label && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {label}
            </span>
          )}
          {showPercentage && (
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {Math.round(clampedValue)}%
            </span>
          )}
        </div>
      )}

      {/* Progress track */}
      <div
        className={`w-full ${heightClass} bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden`}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || `${Math.round(clampedValue)}% complete`}
      >
        {segmentData ? (
          // Segmented progress bar
          <div className="flex h-full">
            {segmentData.map((segment, index) => {
              const segWidth = Math.min(100, Math.max(0, segment.value || 0));
              return (
                <div
                  key={index}
                  className={`${segment.color || color} transition-all duration-500 ease-out ${
                    index === 0 ? 'rounded-l-full' : ''
                  } ${index === segmentData.length - 1 ? 'rounded-r-full' : ''}`}
                  style={{ width: `${segWidth}%` }}
                  title={segment.label ? `${segment.label}: ${Math.round(segWidth)}%` : undefined}
                />
              );
            })}
          </div>
        ) : (
          // Single progress bar
          <div
            className={`h-full ${color} rounded-full transition-all duration-500 ease-out`}
            style={{ width: `${clampedValue}%` }}
          />
        )}
      </div>

      {/* Segment labels */}
      {segmentData && size === 'lg' && (
        <div className="flex mt-1 gap-3">
          {segmentData.map((segment, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${segment.color || color}`} />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {segment.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
