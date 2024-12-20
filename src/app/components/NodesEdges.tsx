export const initialNodes = [
  {
    id: "A",
    data: { label: "A" },
    position: { x: 50, y: 100 },
    style: {
      borderRadius: "50%",
      background: "rgb(179, 170, 148)",
      border: "3px solid black",
      width: "65px",
      height: "65px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "18px", // Make the font size larger
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif", // Use your custom font
    },
  },

  {
    id: "B",
    data: { label: "B" },
    position: { x: 200, y: 50 },
    style: {
      borderRadius: "50%",
      background: "rgb(179, 170, 148)",
      border: "3px solid black",
      width: "65px",
      height: "65px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "18px", // Make the font size larger
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif", // Use your custom font
    },
  },
  {
    id: "C",
    data: { label: "C" },
    position: { x: 400, y: 50 },
    style: {
      borderRadius: "50%",
      background: "rgb(179, 170, 148)",
      border: "3px solid black",
      width: "65px",
      height: "65px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "18px", // Make the font size larger
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif", // Use your custom font
    },
  },
  {
    id: "D",
    data: { label: "D" },
    position: { x: 500, y: 200 },
    style: {
      borderRadius: "50%",
      background: "rgb(179, 170, 148)",
      border: "3px solid black",
      width: "65px",
      height: "65px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "18px", // Make the font size larger
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif", // Use your custom font
    },
  },
  {
    id: "E",
    data: { label: "E" },
    position: { x: 650, y: 150 },
    style: {
      borderRadius: "50%",
      background: "rgb(179, 170, 148)",
      border: "3px solid black",
      width: "65px",
      height: "65px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "18px", // Make the font size larger
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif", // Use your custom font
    },
  },
  {
    id: "F",
    data: { label: "F" },
    position: { x: 100, y: 300 },
    style: {
      borderRadius: "50%",
      background: "rgb(179, 170, 148)",
      border: "3px solid black",
      width: "65px",
      height: "65px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "18px", // Make the font size larger
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif", // Use your custom font
    },
  },
  {
    id: "G",
    data: { label: "G" },
    position: { x: 250, y: 150 },
    style: {
      borderRadius: "50%",
      background: "rgb(179, 170, 148)",
      border: "3px solid black",
      width: "65px",
      height: "65px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "18px", // Make the font size larger
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif", // Use your custom font
    },
  },
  {
    id: "H",
    data: { label: "H" },
    position: { x: 400, y: 300 },
    style: {
      borderRadius: "50%",
      background: "rgb(179, 170, 148)",
      border: "3px solid black",
      width: "65px",
      height: "65px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "18px", // Make the font size larger
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif", // Use your custom font
    },
  },
  {
    id: "I",
    data: { label: "I" },
    position: { x: 550, y: 400 },
    style: {
      borderRadius: "50%",
      background: "rgb(179, 170, 148)",
      border: "3px solid black",
      width: "65px",
      height: "65px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "18px", // Make the font size larger
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif", // Use your custom font
    },
  },
  {
    id: "J",
    data: { label: "J" },
    position: { x: 700, y: 350 },
    style: {
      borderRadius: "50%",
      background: "rgb(179, 170, 148)",
      border: "3px solid black",
      width: "65px",
      height: "65px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "18px", // Make the font size larger
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif", // Use your custom font
    },
  },
  {
    id: "K",
    data: { label: "K" },
    position: { x: 850, y: 450 },
    style: {
      borderRadius: "50%",
      background: "rgb(179, 170, 148)",
      border: "3px solid black",
      width: "65px",
      height: "65px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "18px", // Make the font size larger
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif", // Use your custom font
    },
  },
];

// Define the edges with proper `source`, `target`, and random weights, along with labels
export const initialEdges = [
  {
    id: "eA-B",
    source: "A",
    target: "B",
    style: { stroke: "black", strokeWidth: 3 },
    weight: Math.floor(Math.random() * 20) + 1,
    label: `${Math.floor(Math.random() * 20) + 1}`, // Adding label
    labelStyle: {
      fontSize: 18,
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif",
      background: "rgb(179, 170, 148)",
    },
    labelBgStyle: {
      fill: "#edc915",
    },
    labelBgPadding: [2, 2] as [number, number], // Padding inside the background // Adding label
  },
  {
    id: "eE-J",
    source: "E",
    target: "J",
    style: { stroke: "black", strokeWidth: 3 },
    weight: Math.floor(Math.random() * 20) + 1,
    label: `${Math.floor(Math.random() * 20) + 1}`, // Adding label
    labelStyle: {
      fontSize: 18,
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif",
      background: "rgb(179, 170, 148)",
    },
    labelBgStyle: {
      fill: "#edc915",
    },
    labelBgPadding: [2, 2] as [number, number], // Padding inside the background // Adding label
  },
  {
    id: "eF-I",
    source: "F",
    target: "I",
    style: { stroke: "black", strokeWidth: 3 },
    weight: Math.floor(Math.random() * 20) + 1,
    label: `${Math.floor(Math.random() * 20) + 1}`, // Adding label
    labelStyle: {
      fontSize: 18,
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif",
      background: "rgb(179, 170, 148)",
    },
    labelBgStyle: {
      fill: "#edc915",
    },
    labelBgPadding: [2, 2] as [number, number], // Padding inside the background // Adding label
  },
  {
    id: "eA-F",
    source: "A",
    target: "F",
    style: { stroke: "black", strokeWidth: 3 },
    weight: 10,
    label: "10", // Adding label
    labelStyle: {
      fontSize: 18,
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif",
      background: "rgb(179, 170, 148)",
    },
    labelBgStyle: {
      fill: "#edc915",
    },
    labelBgPadding: [2, 2] as [number, number], // Padding inside the background
  },
  {
    id: "eB-C",
    source: "B",
    target: "C",
    style: { stroke: "black", strokeWidth: 3 },
    weight: Math.floor(Math.random() * 20) + 1,
    label: `${Math.floor(Math.random() * 20) + 1}`, // Adding label
    labelStyle: {
      fontSize: 18,
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif",
      background: "rgb(179, 170, 148)",
    },
    labelBgStyle: {
      fill: "#edc915",
    },
    labelBgPadding: [2, 2] as [number, number], // Padding inside the background
  },
  {
    id: "eD-B",
    source: "D",
    target: "B",
    style: { stroke: "black", strokeWidth: 3 },
    weight: Math.floor(Math.random() * 20) + 1,
    label: `${Math.floor(Math.random() * 20) + 1}`, // Adding label
    labelStyle: {
      fontSize: 18,
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif",
      background: "rgb(179, 170, 148)",
    },
    labelBgStyle: {
      fill: "#edc915",
    },
    labelBgPadding: [2, 2] as [number, number], // Padding inside the background
  },
  {
    id: "eC-D",
    source: "C",
    target: "D",
    style: { stroke: "black", strokeWidth: 3 },
    weight: Math.floor(Math.random() * 20) + 1,
    label: `${Math.floor(Math.random() * 20) + 1}`, // Adding label
    labelStyle: {
      fontSize: 18,
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif",
      background: "rgb(179, 170, 148)",
    },
    labelBgStyle: {
      fill: "#edc915",
    },
    labelBgPadding: [2, 2] as [number, number], // Padding inside the background
  },
  {
    id: "eG-A",
    source: "G",
    target: "A",
    style: { stroke: "black", strokeWidth: 3 },
    weight: Math.floor(Math.random() * 20) + 1,
    label: `${Math.floor(Math.random() * 20) + 1}`, // Adding label
    labelStyle: {
      fontSize: 18,
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif",
      background: "rgb(179, 170, 148)",
    },
    labelBgStyle: {
      fill: "#edc915",
    },
    labelBgPadding: [2, 2] as [number, number], // Padding inside the background
  },
  {
    id: "eE-D",
    source: "D",
    target: "E",
    style: { stroke: "black", strokeWidth: 3 },
    weight: Math.floor(Math.random() * 20) + 1,
    label: `${Math.floor(Math.random() * 20) + 1}`, // Adding label
    labelStyle: {
      fontSize: 18,
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif",
      background: "rgb(179, 170, 148)",
    },
    labelBgStyle: {
      fill: "#edc915",
    },
    labelBgPadding: [2, 2] as [number, number], // Padding inside the background
  },
  {
    id: "eE-F",
    source: "E",
    target: "F",
    style: { stroke: "black", strokeWidth: 3 },
    weight: Math.floor(Math.random() * 20) + 1,
    label: `${Math.floor(Math.random() * 20) + 1}`, // Adding label
    labelStyle: {
      fontSize: 18,
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif",
      background: "rgb(179, 170, 148)",
    },
    labelBgStyle: {
      fill: "#edc915",
    },
    labelBgPadding: [2, 2] as [number, number], // Padding inside the background
  },
  {
    id: "eF-G",
    source: "F",
    target: "G",
    style: { stroke: "black", strokeWidth: 3 },
    weight: Math.floor(Math.random() * 20) + 1,
    label: `${Math.floor(Math.random() * 20) + 1}`, // Adding label
    labelStyle: {
      fontSize: 18,
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif",
      background: "rgb(179, 170, 148)",
    },
    labelBgStyle: {
      fill: "#edc915",
    },
    labelBgPadding: [2, 2] as [number, number], // Padding inside the background
  },
  {
    id: "eG-H",
    source: "G",
    target: "H",
    style: { stroke: "black", strokeWidth: 3 },
    weight: Math.floor(Math.random() * 20) + 1,
    label: `${Math.floor(Math.random() * 20) + 1}`, // Adding label
    labelStyle: {
      fontSize: 18,
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif",
      background: "rgb(179, 170, 148)",
    },
    labelBgStyle: {
      fill: "#edc915",
    },
    labelBgPadding: [2, 2] as [number, number], // Padding inside the background
  },
  {
    id: "eH-I",
    source: "H",
    target: "I",
    style: { stroke: "black", strokeWidth: 3 },
    weight: Math.floor(Math.random() * 20) + 1,
    label: `${Math.floor(Math.random() * 20) + 1}`, // Adding label
    labelStyle: {
      fontSize: 18,
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif",
      background: "rgb(179, 170, 148)",
    },
    labelBgStyle: {
      fill: "#edc915",
    },
    labelBgPadding: [2, 2] as [number, number], // Padding inside the background
  },
  {
    id: "eI-J",
    source: "I",
    target: "J",
    style: { stroke: "black", strokeWidth: 3 },
    weight: Math.floor(Math.random() * 20) + 1,
    label: `${Math.floor(Math.random() * 20) + 1}`, // Adding label
    labelStyle: {
      fontSize: 18,
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif",
      background: "rgb(179, 170, 148)",
    },
    labelBgStyle: {
      fill: "#edc915",
    },
    labelBgPadding: [2, 2] as [number, number], // Padding inside the background
  },
  {
    id: "eJ-K",
    source: "J",
    target: "K",
    style: { stroke: "black", strokeWidth: 3 },
    weight: Math.floor(Math.random() * 20) + 1,
    label: `${Math.floor(Math.random() * 20) + 1}`, // Adding label
    labelStyle: {
      fontSize: 18,
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif",
      background: "rgb(179, 170, 148)",
    },
    labelBgStyle: {
      fill: "#edc915",
    },
    labelBgPadding: [2, 2] as [number, number], // Padding inside the background
  },
];
