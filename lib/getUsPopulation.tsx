export default async function getUSPopulation() {
    const res = await fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population')

    if(!res.ok) throw new Error('failed to fetch data')

    return res.json()
}

export async function getModifiedUSPopulation() {
    try {
      const response = await getUSPopulation(); // Call the existing function to fetch data
      const { data } = response; // Extract the "data" array from the response
  
      return data; // Return the modified data without the "data" wrapper
    } catch (error) {
      throw new Error('Failed to fetch and modify data');
    }
  }
  