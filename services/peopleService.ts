import Character from "../types/Character";
const API_URL = "https://swapi.py4e.com/api/";

export const fetchPeopleDataByPage = async (
  page: number
): Promise<Character[]> => {
  try {
    const response = await fetch(`${API_URL}people/?page=${page}`);
    const data = await response.json();
    return data.results as Character[];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchSpeciesName = async (speciesUrl: string): Promise<string> => {
  try {
    const response = await fetch(speciesUrl);
    const data = await response.json();
    return data.name;
  } catch (error) {
    console.error("Error fetching species:", error);
    return "Unknown";
  }
};

export default { fetchPeopleDataByPage, fetchSpeciesName };
