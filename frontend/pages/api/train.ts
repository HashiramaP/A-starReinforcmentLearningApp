// pages/api/train.js
export default function handler(req, res) {
  if (req.method === "POST") {
    // Simulate the training process
    console.log("Training process started...");
    res.status(200).json({ message: "Training started" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
