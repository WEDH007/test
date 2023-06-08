'use client'

import { useEffect, useState } from 'react';
import { getModifiedUSPopulation } from '@/lib/getUsPopulation';

interface Population {
  Year: number;
  Population: number;
}

const PopulationTable = () => {
  const [populationData, setPopulationData] = useState<Population[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getModifiedUSPopulation();
        setPopulationData(data);
      } catch (error) {
        console.error('Failed to fetch population data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <table className="w-full max-w-xl mx-auto my-4 border-collapse border-2 border-black">
        <thead>
          <tr>
            <th className="px-4 py-2 border-2 border-black">Year</th>
            <th className="px-4 py-2 border-2 border-black">Population</th>
          </tr>
        </thead>
        <tbody>
          {populationData.map((item) => (
            <tr key={item.Year}>
              <td className="px-4 py-2 border-2 border-black">{item.Year}</td>
              <td className="px-4 py-2 border-2 border-black">{item.Population}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PopulationTable;


