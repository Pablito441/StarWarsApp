import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import Character from "@/types/Character";
import Film from "@/types/Film";
import Planet from "@/types/Planet";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchNameUrl, fetchTitleNameUrl } from "../services/urlServices";

export default function DetailItemCategories() {
  const params = useLocalSearchParams();
  const data = params?.data ? JSON.parse(params.data as string) : null;
  const [homeworldName, setHomeworldName] = useState<string | null>(null);
  const [films, setFilms] = useState<string[]>([]);
  const [species, setSpecies] = useState<string[]>([]);
  const [vehicles, setVehicles] = useState<string[]>([]);
  const [starships, setStarships] = useState<string[]>([]);
  const [characters, setCharacters] = useState<string[]>([]);
  const [planets, setPlanets] = useState<string[]>([]);
  const [residents, setResidents] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (data && "speciesName" in data) {
        const character = data as Character;

        // Fetch homeworld name
        if (character.homeworld) {
          try {
            const name = await fetchNameUrl(character.homeworld);
            setHomeworldName(name);
          } catch (error) {
            console.error("Error fetching homeworld name:", error);
          }
        }
        try {
          const filmNames = await Promise.all(
            character.films.map(async (Url) => {
              return await fetchTitleNameUrl(Url);
            })
          );
          setFilms(filmNames);
        } catch (error) {
          console.error("Error fetching film names:", error);
        }
        try {
          const speciesNames = await Promise.all(
            character.species.map(async (Url) => {
              return await fetchNameUrl(Url);
            })
          );
          setSpecies(speciesNames);
        } catch (error) {
          console.error("Error fetching Species names:", error);
        }
        try {
          const vehiclesNames = await Promise.all(
            character.vehicles.map(async (Url) => {
              return await fetchNameUrl(Url);
            })
          );
          setVehicles(vehiclesNames);
        } catch (error) {
          console.error("Error fetching Vehicles names:", error);
        }
        try {
          const starshipsNames = await Promise.all(
            character.starships.map(async (Url) => {
              return await fetchNameUrl(Url);
            })
          );
          setStarships(starshipsNames);
        } catch (error) {
          console.error("Error fetching Starships names:", error);
        }
      } else if ("episode_id" in data) {
        const film = data as Film;
        try {
          const charactersNames = await Promise.all(
            film.characters.map(async (Url) => {
              return await fetchNameUrl(Url);
            })
          );
          setCharacters(charactersNames);
        } catch (error) {
          console.error("Error fetching Characters names:", error);
        }
        try {
          const planetsNames = await Promise.all(
            film.planets.map(async (Url) => {
              return await fetchNameUrl(Url);
            })
          );
          setPlanets(planetsNames);
        } catch (error) {
          console.error("Error fetching Planets names:", error);
        }
        try {
          const speciesNames = await Promise.all(
            film.species.map(async (Url) => {
              return await fetchNameUrl(Url);
            })
          );
          setSpecies(speciesNames);
        } catch (error) {
          console.error("Error fetching Species names:", error);
        }
        try {
          const vehiclesNames = await Promise.all(
            film.vehicles.map(async (Url) => {
              return await fetchNameUrl(Url);
            })
          );
          setVehicles(vehiclesNames);
        } catch (error) {
          console.error("Error fetching Vehicles names:", error);
        }
        try {
          const starshipsNames = await Promise.all(
            film.starships.map(async (Url) => {
              return await fetchNameUrl(Url);
            })
          );
          setStarships(starshipsNames);
        } catch (error) {
          console.error("Error fetching Starships names:", error);
        }
      } else if ("rotation_period" in data) {
        const planets = data as Planet;
        try {
          const filmNames = await Promise.all(
            planets.films.map(async (Url) => {
              return await fetchTitleNameUrl(Url);
            })
          );
          setFilms(filmNames);
        } catch (error) {
          console.error("Error fetching film names:", error);
        }
        try {
          const residentsNames = await Promise.all(
            planets.residents.map(async (Url) => {
              return await fetchNameUrl(Url);
            })
          );
          setResidents(residentsNames);
        } catch (error) {
          console.error("Error fetching Residents names:", error);
        }
      }
    };

    fetchData();
  }, [data]);

  const renderSection = (title: string, items: string[], emptyMsg: string) => (
    <>
      <Text style={s.subTitle}>{title}</Text>
      <View style={s.listContainer}>
        {items.length > 0 ? (
          items.map((item, index) => (
            <Text key={index} style={s.listItem}>
              - {item}
            </Text>
          ))
        ) : (
          <Text style={s.emptyText}>{emptyMsg}</Text>
        )}
      </View>
    </>
  );

  const renderDetails = () => {
    if (!data) return <Text style={s.emptyText}>No data available</Text>;

    if ("speciesName" in data) {
      const character = data as Character;
      return (
        <>
          <Text style={s.title}>{character.name}</Text>
          <Text style={s.detail}>
            Height: {character.height || "Not available"}
          </Text>
          <Text style={s.detail}>
            Mass: {character.mass || "Not available"}
          </Text>
          <Text style={s.detail}>
            Hair color: {character.hair_color || "Not available"}
          </Text>
          <Text style={s.detail}>
            Skin color: {character.skin_color || "Not available"}
          </Text>
          <Text style={s.detail}>
            Eye color: {character.eye_color || "Not available"}
          </Text>
          <Text style={s.detail}>
            Birth year: {character.birth_year || "Not available"}
          </Text>
          <Text style={s.detail}>
            Gender: {character.gender || "Not available"}
          </Text>
          <Text style={s.detail}>
            Homeworld: {homeworldName || "Not available"}
          </Text>

          {renderSection("Films:", films, "No films")}
          {renderSection("Species:", species, "No species")}
          {renderSection("Vehicles:", vehicles, "No vehicles")}
          {renderSection("Starships:", starships, "No starships")}
        </>
      );
    } else if ("episode_id" in data) {
      const film = data as Film;
      return (
        <>
          <Text style={s.title}>{film.title}</Text>
          <Text style={s.detail}>
            Director: {film.director || "Not available"}
          </Text>
          <Text style={s.detail}>
            Producer: {film.producer || "Not available"}
          </Text>
          <Text style={s.detail}>
            Release date: {film.release_date || "Not available"}
          </Text>
          <Text style={s.detail}>
            Episode: {film.episode_id || "Not available"}
          </Text>
          <Text style={s.detail}>
            Opening crawl: {film.opening_crawl || "Not available"}
          </Text>

          {renderSection("Characters:", characters, "No characters")}
          {renderSection("Planets:", planets, "No planets")}
          {renderSection("Starships:", starships, "No starships")}
          {renderSection("Vehicles:", vehicles, "No vehicles")}
          {renderSection("Species:", species, "No species")}
        </>
      );
    } else if ("climate" in data) {
      const planet = data as Planet;
      return (
        <>
          <Text style={s.title}>{planet.name}</Text>
          <Text style={s.detail}>
            Rotation period: {planet.rotation_period || "Not available"}
          </Text>
          <Text style={s.detail}>
            Orbital period: {planet.orbital_period || "Not available"}
          </Text>
          <Text style={s.detail}>
            Diameter: {planet.diameter || "Not available"}
          </Text>
          <Text style={s.detail}>
            Climate: {planet.climate || "Not available"}
          </Text>
          <Text style={s.detail}>
            Gravity: {planet.gravity || "Not available"}
          </Text>
          <Text style={s.detail}>
            Terrain: {planet.terrain || "Not available"}
          </Text>
          <Text style={s.detail}>
            Surface water: {planet.surface_water || "Not available"}
          </Text>
          <Text style={s.detail}>
            Population: {planet.population || "Not available"}
          </Text>

          {renderSection("Residents:", residents, "No residents")}
          {renderSection("Films:", films, "No films")}
        </>
      );
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#0A0A0A" }}
      edges={["bottom"]}
    >
      <ScrollView contentContainerStyle={s.containerMain}>
        {renderDetails()}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  containerMain: {
    flexGrow: 1,
    backgroundColor: "#0A0A0A",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#988EE4",
    marginBottom: 12,
    fontFamily: "System",
    letterSpacing: 0.5,
  },
  detail: {
    fontSize: 17,
    color: "#ffffff",
    marginBottom: 6,
    fontFamily: "System",
    letterSpacing: 0.2,
  },
  linkText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "System",
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff",
    marginTop: 18,
    marginBottom: 7,
    fontFamily: "System",
    letterSpacing: 0.3,
  },
  listContainer: {
    marginBottom: 12,
    paddingLeft: 12,
  },
  listItem: {
    fontSize: 16,
    color: "#ffffff",
    marginBottom: 3,
    fontFamily: "System",
    letterSpacing: 0.1,
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    fontStyle: "italic",
    fontFamily: "System",
    marginBottom: 3,
  },
});
