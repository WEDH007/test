"use client";

import { useState, useEffect } from "react";
import getAllUniversities from "@/lib/getAllUniversities";

interface University {
  name: string;
  web_pages: string;
}

export default function UniversitiesPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(10);
  const [universities, setUniversities] = useState<University[]>([]);

  useEffect(() => {
    async function fetchUniversities() {
      const universitiesData: University[] = await getAllUniversities();
      setUniversities(universitiesData);
    }

    fetchUniversities();
  }, []);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = universities.slice(firstPostIndex, lastPostIndex);

  const totalPages = Math.ceil(universities.length / postsPerPage);

  let startPage = 1;
  let endPage = 5;

  if (totalPages <= 5) {
    endPage = totalPages;
  } else {
    if (currentPage <= 3) {
      endPage = 5;
    } else if (currentPage + 2 >= totalPages) {
      startPage = totalPages - 4;
      endPage = totalPages;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }
  }

  let pageNumbers: number[] = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <section>
      {currentPosts.map((post: University) => (
        <p key={post.name}>
          <a href={`${post.web_pages}`} target="_blank">{post.name}</a>
        </p>
      ))}
      {pageNumbers.map((num) => (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-1" key={num} onClick={() => setCurrentPage(num)}>
          {num}
        </button>
      ))}
    </section>
  );
}
