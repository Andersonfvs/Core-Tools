"use client";

import React, { useState, useEffect, useRef } from "react";

interface Props {
  text: string;
  className?: string;
  triggerOnLoad?: boolean;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789[+-_/\\*#%@!]";

export default function DecodedText({ text, className = "", triggerOnLoad = true }: Props) {
  const [displayText, setDisplayText] = useState(text);
  const isScrambling = useRef(false);

  const scramble = () => {
    if (isScrambling.current) return;
    isScrambling.current = true;
    
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iterations) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iterations >= text.length) {
        clearInterval(interval);
        isScrambling.current = false;
        setDisplayText(text); // Ensure final state matches target exactly
      }
      
      iterations += 1 / 2; // Decodes half character per frame (adjust for speed)
    }, 25);
  };

  useEffect(() => {
    if (triggerOnLoad) {
      scramble();
    } else {
      setDisplayText(text);
    }
  }, [text, triggerOnLoad]);

  return (
    <span onMouseEnter={scramble} className={`${className} cursor-default select-none`}>
      {displayText}
    </span>
  );
}
