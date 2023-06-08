"use client";

import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { getModifiedUSPopulation } from "@/lib/getUsPopulation";
import { ApexOptions } from "apexcharts";

const PopulationChart = () => {
  const [series, setSeries] = useState<{ name: string; data: { x: any; y: any }[]; }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getModifiedUSPopulation();
        const chartData = data.map((item: { Year: any; Population: any }) => ({
          x: item.Year,
          y: item.Population,
        }));
        setSeries([{  name: "Population", data: chartData }]);
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

  return <><ReactApexChart options={options} series={series} type="bar"/> </>;
};

export default PopulationChart;
