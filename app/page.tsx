import Image from "next/image";
import Sidebar from "./components/Sidebar";
import Chart from "./components/PopulationChart";
import PopulationChart from "./components/PopulationChart";

export default function Home() {
  return (
    <main>
        <PopulationChart />
    </main>
  );
}
