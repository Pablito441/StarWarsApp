const API_URL = "https://swapi.py4e.com/api/";

const fetchPlanetsDataByPage = async (page: number) => {
  try {
    const response = await fetch(`${API_URL}planets/?page=${page}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default fetchPlanetsDataByPage;
