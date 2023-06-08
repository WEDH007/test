'use client'

import { useState } from "react"
import getAllUniversities from "@/lib/getAllUniversities"
import Link from "next/link"
import Pagination from "../components/Pagination"

export default async function UniversitiesPage() {
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setpostsPerPage] = useState(10)
    const universitiesData: Promise<University[]> = getAllUniversities()



    const universities = await universitiesData

    const lastPostIndex = currentPage * postsPerPage
    const firstPostIndex = lastPostIndex - postsPerPage
    const currentPosts = universities.slice(firstPostIndex, lastPostIndex)

    const content = (
        <section>
            {currentPosts.map(post => {
                return (
                    <p key={post.name}>
                        <Link href={`${post.web_pages}`}>{post.name}</Link>
                    </p>
                )
            })}
            <Pagination/>
        </section>
    )

    return content
}



