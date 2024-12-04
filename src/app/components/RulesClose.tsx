"use client";
// RulesBox.tsx (Client-side)
import { useState } from "react";
import RulesContent from "./RulesBox"; // Import the static content

export default function RulesBox() {
  const [isVisible, setIsVisible] = useState(true); // Controls visibility

  const handleClose = () => {
    console.log("closed");
    setIsVisible(false); // Close the rules box
  };

  if (!isVisible) return null; // Return null if it's closed

  return (
    <div className="relative">
      <RulesContent>
        <button className="close-btn" onClick={handleClose}>
          &times; {/* Close icon */}
        </button>
      </RulesContent>{" "}
      {/* Static content of the rules */}
    </div>
  );
}
