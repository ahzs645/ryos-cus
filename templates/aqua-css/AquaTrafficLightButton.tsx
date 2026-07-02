/**
 * aqua.css traffic light — drop-in replacement for ryOS's TrafficLightButton.
 *
 * Installed by ryos-cus as src/components/shared/AquaTrafficLightButton.tsx;
 * WindowFrameTitleBar's import is re-pointed here so the window controls
 * render with aqua.css's `.aqua-light` markup (see aqua.css
 * src/_traffic-lights.scss) instead of ryOS's inline-TS gradients. This is
 * the "TEMPLATE" mechanism from docs/RYOS_MAPPING.md — these controls are
 * unreachable by stylesheet overrides alone.
 *
 * Hover-reveal of the ×/−/+ glyphs is driven by aqua.css's
 * `.traffic-lights:hover` container rule; the apply script adds the
 * `traffic-lights` class to the titlebar's control group.
 *
 * When the skin is disabled (VITE_AQUA_CSS_SKIN=false) it delegates to the
 * original component so builds stay comparable.
 */
import React from "react";
import { TrafficLightButton as NativeTrafficLightButton } from "@/components/shared/TrafficLightButton";

const SKIN_ENABLED =
  (import.meta.env.VITE_AQUA_CSS_SKIN ?? "true") !== "false";

type TrafficLightColor = "red" | "yellow" | "green";

interface TrafficLightButtonProps {
  color: TrafficLightColor;
  onClick: (e: React.MouseEvent) => void;
  isForeground: boolean;
  showResizers?: boolean;
  ariaLabel: string;
}

const GLYPHS: Record<TrafficLightColor, string> = {
  red: "×",
  yellow: "−",
  green: "+",
};

export function TrafficLightButton(props: TrafficLightButtonProps) {
  if (!SKIN_ENABLED) {
    return <NativeTrafficLightButton {...props} />;
  }

  const { color, onClick, isForeground, ariaLabel } = props;

  return (
    <div className="relative" style={{ width: "14px", height: "14px" }}>
      {/* Visual orb — styled entirely by aqua.css (.aqua-light et al.) */}
      <div
        aria-hidden="true"
        className={`aqua-light aqua-${color}${isForeground ? "" : " aqua-inactive"}`}
      >
        <span className="icon">{GLYPHS[color]}</span>
      </div>
      {/* Enlarged clickable area, mirroring ryOS's native hit target */}
      <button
        aria-label={ariaLabel}
        className="absolute -inset-2 z-10 opacity-0 outline-none cursor-default"
        onClick={(e) => {
          e.stopPropagation();
          onClick(e);
        }}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      />
    </div>
  );
}
