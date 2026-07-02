/**
 * aqua.css skin manager
 *
 * Layers the aqua.css library (https://github.com/ahzs645/aqua.css) on top of
 * ryOS's built-in Aqua theme so the two renderings can be compared for
 * accuracy. Installed by ryos-cus (scripts/customize/apply-customizations.ts).
 *
 * When the active theme is "macosx" this module:
 *   1. adds the `aqua` class to <html> so `aqua.scoped.css` rules
 *      (all prefixed with `.aqua`) start matching, and
 *   2. injects <link> tags for /aqua-css/aqua.scoped.css (the scoped library
 *      build) and /aqua-css/aqua-bridge.css (remaps ryOS --os-* tokens to
 *      aqua.css tokens and force-overrides inline-styled surfaces).
 *
 * Switching to any other theme removes the class and both stylesheets, so the
 * skin never leaks into System 7 / XP / 98. Disable entirely with
 * VITE_AQUA_CSS_SKIN=false.
 *
 * For best accuracy comparisons set ryOS to: Classic material, Light
 * appearance, System accent (aqua.css models Mac OS X 10.0–10.4 light Aqua).
 */
import { useThemeStore } from "@/stores/useThemeStore";

const ENABLED = String(import.meta.env.VITE_AQUA_CSS_SKIN ?? "true") !== "false";

const BASE = import.meta.env.BASE_URL ?? "/";

const SHEETS: Array<{ id: string; href: string }> = [
  { id: "aqua-css-scoped", href: `${BASE}aqua-css/aqua.scoped.css` },
  { id: "aqua-css-bridge", href: `${BASE}aqua-css/aqua-bridge.css` },
];

function setSheet(id: string, href: string, on: boolean) {
  let link = document.getElementById(id) as HTMLLinkElement | null;
  if (on) {
    if (link) return;
    link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = href;
    link.dataset.role = "aqua-css-skin";
    document.head.appendChild(link);
  } else {
    link?.remove();
  }
}

let applied: boolean | null = null;

function apply(theme: string) {
  const on = ENABLED && theme === "macosx";
  if (on === applied) return;
  applied = on;

  const root = document.documentElement;
  root.classList.toggle("aqua", on);
  if (on) root.setAttribute("data-aqua-css-skin", "true");
  else root.removeAttribute("data-aqua-css-skin");

  for (const sheet of SHEETS) setSheet(sheet.id, sheet.href, on);
}

if (ENABLED && typeof document !== "undefined") {
  apply(useThemeStore.getState().current);
  useThemeStore.subscribe((state) => apply(state.current));
}
