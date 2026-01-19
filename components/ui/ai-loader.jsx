import React from "react";
import { cn } from "../../lib/utils";

export const AiLoader = ({ className, text = "Loading" }) => {
  const letters = text.split("");

  return (
    <div className={cn("flex flex-col items-center justify-center p-8", className)}>
      <div className="loader-wrapper">
        <div className="loader-letters-container">
          {letters.map((char, index) => (
            <span 
              key={index} 
              className="loader-letter" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {char}
            </span>
          ))}
        </div>
        <div className="loader"></div>
      </div>
    </div>
  );
};