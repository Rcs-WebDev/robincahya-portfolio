import React, { useState, useEffect } from "react";

export default function ScrambleText({
  text = "",
  trigger = true,
  delay = 0,
  speed = 35,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=",
  className = ""
}) {
  const [displayText, setDisplayText] = useState("");
  const [isScrambling, setIsScrambling] = useState(false);
  const [isResolved, setIsResolved] = useState(false);

  useEffect(() => {
    if (!text) {
      setDisplayText("");
      return;
    }

    // While waiting for trigger (during curtain & ripple phases), keep hidden
    if (!trigger) {
      setDisplayText("");
      setIsResolved(false);
      setIsScrambling(false);
      return;
    }

    let timeout;
    let interval;
    let iteration = 0;

    timeout = setTimeout(() => {
      setIsScrambling(true);

      interval = setInterval(() => {
        setDisplayText(() =>
          text
            .split("")
            .map((char, index) => {
              if (char === " " || char === "\n") return char;
              if (index < Math.floor(iteration)) return text[index];
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
          setDisplayText(text);
          setIsScrambling(false);
          setIsResolved(true);
        }

        // Advance iteration for smooth decoding cadence
        iteration += 1 / 2.2;
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, trigger, delay, speed, characters]);

  // If not triggered yet and not resolved, preserve layout invisibly
  if (!trigger && !isResolved) {
    return (
      <span
        className={`scramble-text-wrapper ${className}`}
        style={{ opacity: 0, userSelect: "none" }}
        aria-hidden="true"
      >
        {text}
      </span>
    );
  }

  return (
    <span
      className={`scramble-text-wrapper ${isScrambling ? "scramble-active" : ""} ${
        isResolved ? "scramble-done" : ""
      } ${className}`}
    >
      {displayText || text}
    </span>
  );
}