"use client";

import React from "react";

// Function to send the POST request to the /api/train route
const sendTrainRequest = async () => {
  try {
    const response = await fetch("/api/train", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("Training started");
    } else {
      console.error("Failed to start training", response.statusText);
    }
  } catch (error) {
    console.error("Error during the request", error);
  }
};

function HomepageButtons() {
  return (
    <div className="flex space-x-6 mt-6">
      {/* Generate Graph Button */}
      <button className="rock-button">Generate a Graph</button>

      {/* Train Model Button */}
      <button className="rock-button" onClick={sendTrainRequest}>
        Train my Model
      </button>
    </div>
  );
}

export default HomepageButtons;
