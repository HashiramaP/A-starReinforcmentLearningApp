import FlowGraph from "./components/FlowGraph";
import HomepageHeader from "./components/HomepageHeader";

export default function Home() {
  return (
    <div className="flex flex-col items-center h-screen">
      <HomepageHeader />
      <FlowGraph />
      <div className="flex space-x-6">
        <button className="rock-button">Generate a Graph</button>
        <button className="rock-button">Train my Model</button>
      </div>
    </div>
  );
}
