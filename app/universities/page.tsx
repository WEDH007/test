"use client";

import { useState, useEffect } from "react";
import getAllUniversities from "@/lib/getAllUniversities";
import Link from "next/link";

export default function UniversitiesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [allUniversities, setAllUniversities] = useState([]);
  const postsPerPage = 10;
  const pageNumberLimit = 5;
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const universitiesData = await getAllUniversities();
      setAllUniversities(universitiesData);
    };
    fetchData();
  }, []);

  const pages = [];
  for (let i = 1; i <= Math.ceil(allUniversities.length / postsPerPage); i++) {
    pages.push(i);
  }

  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = allUniversities.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <section>
        {currentPosts.map((post) => {
          return (
            <p key={post.name}>
              <Link href={`${post.web_pages}`}>{post.name}</Link>
            </p>
          );
        })}
      </section>
      <ul className="pageNumbers list-none">
        <li className="inline-block">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-1"
            onClick={handlePrevbtn}
            disabled={currentPage == pages[0] ? true : false}
          >
            Prev
          </button>
        </li>

        <li className="inline-block">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-1"
            onClick={handleNextbtn}
            disabled={currentPage == pages[pages.length - 1] ? true : false}
          >
            Next
          </button>
        </li>
      </ul>
    </>
  );
}
