"use client";

import { useState, useEffect } from "react";
import getAllUniversities from "@/lib/getAllUniversities";
import Link from "next/link";

interface University {
  country: string;
  alpha_two_code: string;
  name: string;
  domains: string[];
  web_pages: string[];
}

export default function UniversitiesPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(10);
  const [universities, setUniversities] = useState<University[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    async function fetchUniversities() {
      const universitiesData: University[] = await getAllUniversities();
      setUniversities(universitiesData);
    }

    fetchUniversities();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredPosts = universities.filter((post) =>
    post.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filteredPosts.slice(firstPostIndex, lastPostIndex);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  let startPage = 1;
  let endPage = 5;

  // if (totalPages <= 5) {
  //   endPage = totalPages;
  //   console.log(totalPages);
  // } else {
  //   if (currentPage <= 3) {
  //     endPage = 5;
  //     console.log(currentPage);

  //   } else if (currentPage + 2 >= totalPages) {
  //     startPage = totalPages - 4;
  //     endPage = totalPages;
  //     console.log(currentPage);

  //   } else {
  //     startPage = currentPage - 2;
  //     endPage = currentPage + 2;
  //   }
  // }

  // let pageNumbers: number[] = [];
  // for (let i = startPage; i <= endPage; i++) {
  //   pageNumbers.push(i);
  // }

  let pageNumbers: number[] = [];
  for (let i = currentPage - 2; i < currentPage; i++) {
    if (i >= 1) {
      pageNumbers.push(i);
    }
  }

  for (let i = currentPage; i <= currentPage + 2; i++) {
    if (i <= totalPages) pageNumbers.push(i);
  }


  return (
    <section>
      <input
        className="w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />

      {/* {currentPosts.map((post: University) => (
        <div
          className="border-b m-3 p-3 justify-center items-center"
          key={post.name}
        >
          <p key={post.name}>
            <Link href={`${post.web_pages}`} target="_blank">
              {post.name}
            </Link>
          </p>
        </div>
      ))} */}

      {currentPosts.map((post: University, index: number) => (
        <div
          className="border-b m-3 p-3 justify-center items-center"
          key={index}
        >
          <p key={index}>
            <Link href={`${post.web_pages}`} target="_blank">
              {post.name}
            </Link>
          </p>
        </div>
      ))}

      {pageNumbers.map((num) => (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-1"
          key={num}
          onClick={() => setCurrentPage(num)}
        >
          {num}
        </button>
      ))}
    </section>
  );
}
