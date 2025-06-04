import Character from "../types/Character";
import Film from "../types/Film";
import Planet from "../types/Planet";
import fetchFilmsDataByPage from "./filmService";
import fetchTotalPages from "./pagesService";
import { fetchPeopleDataByPage, fetchSpeciesName } from "./peopleService";
import fetchPlanetsDataByPage from "./planetsService";

// Carga y procesa todos los personajes con speciesName
export const getAllCharacters = async (): Promise<Character[]> => {
  const totalPages = await fetchTotalPages("Characters");
  let allCharacters: Character[] = [];
  for (let page = 1; page <= totalPages; page++) {
    const data = await fetchPeopleDataByPage(page);
    allCharacters = allCharacters.concat(data);
  }
  // Agrega speciesName
  const charactersWithSpecies = await Promise.all(
    allCharacters.map(async (character) => {
      const speciesNames = await Promise.all(
        character.species.map((speciesUrl) => fetchSpeciesName(speciesUrl))
      );
      return { ...character, speciesName: speciesNames[0] || "Unknown" };
    })
  );
  return charactersWithSpecies;
};

export const getAllPlanets = async (): Promise<Planet[]> => {
  const totalPages = await fetchTotalPages("Planets");
  let allPlanets: Planet[] = [];
  for (let page = 1; page <= totalPages; page++) {
    const data = await fetchPlanetsDataByPage(page);
    allPlanets = allPlanets.concat(data);
  }
  return allPlanets;
};

export const getAllFilms = async (): Promise<Film[]> => {
  const totalPages = await fetchTotalPages("Films");
  let allFilms: Film[] = [];
  for (let page = 1; page <= totalPages; page++) {
    const data = await fetchFilmsDataByPage(page);
    allFilms = allFilms.concat(data);
  }
  return allFilms;
};

// Para paginación
export const getCharactersByPage = async (
  page: number
): Promise<Character[]> => {
  const people = await fetchPeopleDataByPage(page);
  return Promise.all(
    people.map(async (person: Character) => {
      const speciesName =
        person.species.length > 0
          ? await fetchSpeciesName(person.species[0])
          : "Unknown";
      return { ...person, speciesName };
    })
  );
};

export const getPlanetsByPage = async (page: number): Promise<Planet[]> => {
  return fetchPlanetsDataByPage(page);
};

export const getFilmsByPage = async (page: number): Promise<Film[]> => {
  return fetchFilmsDataByPage(page);
};

export const getTotalPages = fetchTotalPages;
