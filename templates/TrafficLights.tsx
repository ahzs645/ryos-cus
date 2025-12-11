import "./TrafficLights.css";

interface TrafficLightsProps {
  showClose?: boolean;
  showMinimize?: boolean;
  showMaximize?: boolean;
  closeDisabled?: boolean;
  minimizeDisabled?: boolean;
  maximizeDisabled?: boolean;
  isForeground?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: (e: React.MouseEvent | React.TouchEvent) => void;
}

export function TrafficLights({
  showClose = true,
  showMinimize = true,
  showMaximize = true,
  closeDisabled = false,
  minimizeDisabled = false,
  maximizeDisabled = false,
  isForeground = true,
  onClose,
  onMinimize,
  onMaximize,
}: TrafficLightsProps) {
  const isInactive = !isForeground;

  return (
    <div className="traffic-lights" data-titlebar-controls>
      {showClose && (
        <div
          className={`aqua-light aqua-red ${
            closeDisabled || isInactive ? "aqua-inactive" : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            if (!closeDisabled) onClose?.();
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          role="button"
          tabIndex={closeDisabled ? -1 : 0}
          aria-label="Close"
        >
          <span className="icon">&times;</span>
        </div>
      )}
      {showMinimize && (
        <div
          className={`aqua-light aqua-yellow ${
            minimizeDisabled || isInactive ? "aqua-inactive" : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            if (!minimizeDisabled) onMinimize?.();
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          role="button"
          tabIndex={minimizeDisabled ? -1 : 0}
          aria-label="Minimize"
        >
          <span className="icon">&minus;</span>
        </div>
      )}
      {showMaximize && (
        <div
          className={`aqua-light aqua-green ${
            maximizeDisabled || isInactive ? "aqua-inactive" : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            if (!maximizeDisabled) onMaximize?.(e);
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          role="button"
          tabIndex={maximizeDisabled ? -1 : 0}
          aria-label="Maximize"
        >
          <span className="icon">+</span>
        </div>
      )}
    </div>
  );
}

export default TrafficLights;
