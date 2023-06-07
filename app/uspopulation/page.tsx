import PopulationTable from "../components/PopulationTable";
import Sidebar from "../components/Sidebar";

const USPopulation = () => {
  return (
    <>
      <div>
        <Sidebar />
        <div className="table">
          <PopulationTable />
        </div>
      </div>
    </>
  );
};

export default USPopulation;
