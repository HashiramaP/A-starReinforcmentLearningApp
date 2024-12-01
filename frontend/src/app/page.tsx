import FlowGraph from "./components/FlowGraph";
import HomepageButtons from "./components/HomepageButtons";
import HomepageHeader from "./components/HomepageHeader";

export default function Home() {
  return (
    <div className="flex flex-col items-center h-screen">
      <HomepageHeader />
      <FlowGraph />
      <HomepageButtons />
    </div>
  );
}
