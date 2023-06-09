'use client'

// import React, { useEffect, useState } from "react";
// import { Suspense } from "react";
// // import ReactApexChart from "react-apexcharts";
// const ReactApexChart = dynamic(() => import("react-apexcharts"), {
//   ssr: false,
// });
// import { getModifiedUSPopulation } from "@/lib/getUsPopulation";
// import { ApexOptions } from "apexcharts";
// import dynamic from "next/dynamic";
// import { render } from "react-dom";

// const PopulationChart = () => {
//   const [initialRenderComplete, setInitialRenderComplete] = useState(false);
//   const [series, setSeries] = useState<
//     { name: string; data: { x: any; y: any }[] }[]
//   >([]);

//   	// This useEffect will only run once, during the first render
// 	useEffect(() => {
// 		// Updating a state causes a re-render
// 		setInitialRenderComplete(true);
// 	}, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getModifiedUSPopulation();
//         const chartData = data.map((item: { Year: any; Population: any }) => ({
//           x: item.Year,
//           y: item.Population,
//         }));
//         setSeries([{ name: "Population", data: chartData }]);
//       } catch (error) {
//         console.error("Failed to fetch population data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const options: ApexOptions = {
//     chart: {
//       type: "bar",
//     },
//     xaxis: {
//       type: "category",
//       title: {
//         text: "Year",
//       },
//     },
//     yaxis: {
//       title: {
//         text: "Population",
//       },
//     },
//     title: {
//       text: "US Population Over Time",
//       align: "center",
//     },
//   };

//   return (
//     <>
//       {/* <div className="mixed-chart">
//         {typeof window !== "undefined" && (
//           <ReactApexChart options={options} series={series} type="bar" />
//         )}{" "}
//       </div> */}

//       {/* <div className="mixed-chart">
//         {typeof window === "undefined" ? (
//           <div>Loading...</div>
//         ) : (
//           <ReactApexChart options={options} series={series} type="bar" />
//         )}
//       </div> */}

//       <div className="mixed-chart">
//         <Suspense fallback={<div>Loading...</div>}>
//           {typeof window !== "undefined" && (
//             <ReactApexChart options={options} series={series} type="bar" />
//           )}
//         </Suspense>
//       </div>
//     </>
//   );
// };

// export default PopulationChart;


import React, { useEffect, useState, Suspense } from "react";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { getModifiedUSPopulation } from "@/lib/getUsPopulation";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const PopulationChart = () => {
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  const [series, setSeries] = useState<
    { name: string; data: { x: any; y: any }[] }[]
  >([]);

  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getModifiedUSPopulation();
        const chartData = data.map((item: { Year: any; Population: any }) => ({
          x: item.Year,
          y: item.Population,
        }));
        setSeries([{ name: "Population", data: chartData }]);
      } catch (error) {
        console.error("Failed to fetch population data:", error);
      }
    };

    fetchData();
  }, []);

  const options: ApexOptions = {
    chart: {
      type: "bar",
    },
    xaxis: {
      type: "category",
      title: {
        text: "Year",
      },
    },
    yaxis: {
      title: {
        text: "Population",
      },
    },
    title: {
      text: "US Population Over Time",
      align: "center",
    },
  };

  if (!initialRenderComplete) {
    return null;
  } else {
    return (
      <div className="mixed-chart">
        <Suspense fallback={<div>Loading...</div>}>
          {typeof window !== "undefined" && (
            <ReactApexChart options={options} series={series} type="bar" />
          )}
        </Suspense>
      </div>
    );
  }
};

export default PopulationChart;
