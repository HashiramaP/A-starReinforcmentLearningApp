export default function HomepageHeader() {
  return (
    <div className="w-1/3">
      <svg viewBox="0 100 900 400" className="w-full h-auto">
        {" "}
        {/* Adjusted viewBox to reduce space at the top */}
        {/* Define the path for the arc */}
        <path
          id="curve"
          d="M50,300 Q450,150 850,300" // Shallower curve
          stroke="none" // Hides the curve
          fill="none" // Ensures no fill color
        />
        {/* Text that follows the path */}
        <text width="900">
          <textPath
            xlinkHref="#curve"
            className="text-6xl font-bold text-black font-halo"
            textAnchor="middle" // Centers the text
            startOffset="50%" // Adjusts the starting position
          >
            A* Reinforcement Learning
          </textPath>
        </text>
      </svg>
    </div>
  );
}
