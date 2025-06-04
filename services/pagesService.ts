import API_URL from "../config";

const fetchTotalPages = async (category: string): Promise<number> => {
  try {
    let response;
    if (category === "Characters") {
      response = await fetch(`${API_URL}people/?page=1`);
    } else if (category === "Planets") {
      response = await fetch(`${API_URL}planets/?page=1`);
    } else if (category === "Films") {
      response = await fetch(`${API_URL}films/?page=1`);
    } else {
      throw new Error("Categoría no válida");
    }

    const data = await response.json();
    return Math.ceil(data.count / data.results.length);
  } catch (error) {
    console.error("Error fetching total pages:", error);
    throw error;
  }
};
export default fetchTotalPages;
