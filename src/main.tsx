import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

/**
 * PDF-like scaling fix for mobile/narrow screens.
 *
 * When viewport is set to width=1440 (done in index.html for mobile),
 * CSS `vw` units scale correctly because the browser treats the page as 1440px wide.
 * However, `vh` still references the PHYSICAL viewport height, causing proportion issues.
 *
 * Solution: Set a CSS variable --vh that represents 1% of the "correct" viewport height
 * (i.e., the height that matches the 1440px width proportionally).
 *
 * On desktop (screen.width >= 1024): --vh = normal 1vh (no change needed)
 * On mobile (screen.width < 1024): --vh = (physicalHeight / physicalWidth * 1440) / 100
 *   This makes height proportional to the scaled width.
 */
function setupVhFix() {
  const DESIGN_WIDTH = 1440;
  const isMobile = window.screen.width < 1024;

  function update() {
    if (isMobile) {
      // On mobile with viewport width=1440, the browser scales the 1440px layout
      // to fit the physical screen width. The physical viewport height needs to be
      // converted to the same coordinate space (1440px-based).
      // physicalHeight / physicalWidth * DESIGN_WIDTH = height in 1440-based px
      const scaledHeight =
        (window.screen.height / window.screen.width) * DESIGN_WIDTH;
      document.documentElement.style.setProperty(
        "--vh",
        `${scaledHeight / 100}px`,
      );
    } else {
      // On desktop, just use real viewport height
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight / 100}px`,
      );
    }
  }

  update();
  window.addEventListener("resize", update);
}

setupVhFix();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
