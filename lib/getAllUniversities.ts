export default async function getAllUniversities() {
    const res = await fetch('http://universities.hipolabs.com/search?country=United+States')

    if (!res.ok) throw new Error('failed to fetch data')

    return res.json()
}