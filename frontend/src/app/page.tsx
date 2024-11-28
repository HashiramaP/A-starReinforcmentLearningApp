import FlowGraph from "./components/FlowGraph";
import HomepageHeader from "./components/HomepageHeader";

export default function Home() {
  return (
    <div className="flex flex-col items-center h-screen">
      <HomepageHeader />
      <FlowGraph />
    </div>
  );
}
