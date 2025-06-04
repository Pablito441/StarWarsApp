import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import fetchFilmsDataByPage from "../../services/filmService";
import fetchTotalPages from "../../services/pagesService";
import {
  fetchPeopleDataByPage,
  fetchSpeciesName,
} from "../../services/peopleService";
import fetchPlanetsDataByPage from "../../services/planetsService";
import Character from "../../types/Character";
import Film from "../../types/Film";
import Planet from "../../types/Planet";
import Categories from "../components/Categories";
import ItemCategories from "../components/ItemCategories";
import ListItemCategories from "../components/ListItemCategories";

export default function Index() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [films, setFilms] = useState<Film[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [activeCategory, setActiveCategory] = useState<string>("Characters");

  //search
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [allPlanets, setAllPlanets] = useState<Planet[]>([]);
  const [allFilms, setAllFilms] = useState<Film[]>([]);

  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    const loadData = async () => {
      //Personajes
      try {
        const totalPages = await fetchTotalPages("Characters");
        const temporalAllCharacters: Character[] = [];

        for (let page = 1; page <= totalPages; page++) {
          const data = await fetchPeopleDataByPage(page);
          temporalAllCharacters.push(...data);
        }

        const charactersWithSpecies = await Promise.all(
          temporalAllCharacters.map(async (character) => {
            const speciesNames = await Promise.all(
              character.species.map((speciesUrl) =>
                fetchSpeciesName(speciesUrl)
              )
            );
            return { ...character, speciesName: speciesNames[0] || "Unknown" };
          })
        );

        setAllCharacters(charactersWithSpecies);
      } catch (error) {
        console.error("Error loading characters:", error);
      }
      //Planetas
      try {
        const totalPages = await fetchTotalPages("Planets");
        const temporalAllPlanets: Planet[] = [];
        for (let page = 1; page <= totalPages; page++) {
          const data = await fetchPlanetsDataByPage(page);
          temporalAllPlanets.push(...data);
        }
        setAllPlanets(temporalAllPlanets);
      } catch (error) {
        console.error("Error loading planets:", error);
      }
      //Peliculas
      try {
        const totalPages = await fetchTotalPages("Films");
        const temporalAllFilms: Film[] = [];
        for (let page = 1; page <= totalPages; page++) {
          const data = await fetchFilmsDataByPage(page);
          temporalAllFilms.push(...data);
        }
        setAllFilms(temporalAllFilms);
      } catch (error) {
        console.error("Error loading films:", error);
      }
    };
    loadData();
  }, []);

  const filteredCharacters = allCharacters.filter((character) =>
    character.name.toLowerCase().startsWith(searchText.toLowerCase())
  );
  const filteredPlanets = allPlanets.filter((planets) =>
    planets.name.toLowerCase().startsWith(searchText.toLowerCase())
  );
  const filteredFilms = allFilms.filter((films) =>
    films.title.toLowerCase().startsWith(searchText.toLowerCase())
  );
  /////////

  useEffect(() => {
    if (activeCategory === "Characters") {
      const getDataCharacters = async () => {
        try {
          const people = await fetchPeopleDataByPage(currentPage);
          const peopleWithSpeciesNames = await Promise.all(
            people.map(async (person: Character) => {
              const speciesName =
                person.species.length > 0
                  ? await fetchSpeciesName(person.species[0])
                  : "Unknown";
              return { ...person, speciesName };
            })
          );
          setCharacters(peopleWithSpeciesNames);
          //obtener el numero de paginación maximo
          const pages = await fetchTotalPages(activeCategory);
          setTotalPages(pages);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      getDataCharacters();
    } else if (activeCategory === "Planets") {
      const getDataPlanets = async () => {
        try {
          const planetsData = await fetchPlanetsDataByPage(currentPage);
          setPlanets(planetsData);
          const pages = await fetchTotalPages(activeCategory);
          setTotalPages(pages);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      getDataPlanets();
    } else if (activeCategory === "Films") {
      const getDataFilms = async () => {
        try {
          const filmsData = await fetchFilmsDataByPage(currentPage);
          setFilms(filmsData);
          const pages = await fetchTotalPages(activeCategory);
          setTotalPages(pages);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      getDataFilms();
    }
  }, [currentPage, activeCategory]);

  return (
    <View style={styles.container}>
      <Categories
        onCategoryChange={setActiveCategory}
        activeCategory={activeCategory}
      />
      <View style={styles.searchContainerMain}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={24} color="#fff" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholderTextColor="#fff"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {activeCategory === "Characters" &&
        (searchText.trim() !== "" ? (
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
          >
            {filteredCharacters.map((character) => (
              <ItemCategories
                key={character.url}
                nameItem={character.name}
                descriptionItem={character.speciesName}
                data={character}
              />
            ))}
          </ScrollView>
        ) : (
          <>
            <View style={styles.containerListItemCategories}>
              <ListItemCategories
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </View>
            <ScrollView style={styles.scrollContent}>
              {characters.map((character, index) => (
                <ItemCategories
                  key={index}
                  nameItem={character.name}
                  descriptionItem={character.speciesName}
                  data={character}
                />
              ))}
            </ScrollView>
          </>
        ))}
      {activeCategory === "Planets" &&
        (searchText.trim() !== "" ? (
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
          >
            {filteredPlanets.map((planets) => (
              <ItemCategories
                key={planets.url}
                nameItem={planets.name}
                descriptionItem={planets.climate}
                data={planets}
              />
            ))}
          </ScrollView>
        ) : (
          <>
            <View style={styles.containerListItemCategories}>
              <ListItemCategories
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </View>
            <ScrollView style={styles.scrollContent}>
              {planets.map((planet, index) => (
                <ItemCategories
                  key={index}
                  nameItem={planet.name}
                  descriptionItem={planet.climate}
                  data={planet}
                />
              ))}
            </ScrollView>
          </>
        ))}
      {activeCategory === "Films" &&
        (searchText.trim() !== "" ? (
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
          >
            {filteredFilms.map((film) => (
              <ItemCategories
                key={film.url}
                nameItem={`Star wars: ${film.title}`}
                descriptionItem={`Productor: ${film.producer}`}
                data={film}
              />
            ))}
          </ScrollView>
        ) : (
          <>
            <View style={styles.containerListItemCategories}>
              <ListItemCategories
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </View>
            <ScrollView style={styles.scrollContent}>
              {films.map((film, index) => (
                <ItemCategories
                  key={index}
                  nameItem={`Star wars: ${film.title}`}
                  descriptionItem={`Productor: ${film.producer}`}
                  data={film}
                />
              ))}
            </ScrollView>
          </>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  linkText: {
    color: "#ffffff",
  },
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },
  scrollContainer: {
    width: "100%",
  },
  scrollContent: {},
  searchContainerMain: {
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#363636",
    paddingHorizontal: 10,
    width: "95%",
    marginVertical: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#fff",
  },
  containerListItemCategories: {
    height: 35,
    marginBottom: 2,
  },
});
