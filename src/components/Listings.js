import axios from "axios";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Loader from "../loader/Loader";

import CardTemp from "./CardTemp";
import { Link } from "react-router-dom";
import { Box, Button, InputLabel, MenuItem, Select } from "@mui/material";
import {
  removeDuplicatesFromArray,
  filterPokemonByAbility,
  filterPokemonByGroup,
  filterPokemonBySpecies,
  filterPokemonByLocation,
  filterPokemonByNames,
} from "../utils/sortingFunc";

const Listings = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [next, setNext] = useState(0);
  const [abilities, setAbilities] = useState([]);
  const [characteristic, setCharacteristics] = useState([]);

  const [species, setSpecies] = useState([]);
  const observer = useRef();

  const lastPokemonElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting) {
          setNext((next) => next + 10);
          // console.log(next);
          if (next > 0) await fetchData(next);
          // console.log("visible");
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, next]
  );
  let cancel;
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${next}`,
        {
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        }
      );

      const urls = response.data?.results.map((item) => item.url);
      const pokemonRequests = urls.map(async (url) => await axios.get(url));
      const pokemonResponses = await Promise.all(pokemonRequests);
      const newPokemonData = pokemonResponses
        .map((res) => res.data)
        .filter(
          (pokemon) => !data.map((item) => item?.name).includes(pokemon?.name)
        );

      setData((prevData) => [...prevData, ...newPokemonData]);

      setLoading(false);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  const completeAbilities = [];

  const fetchAbilities = () => {
    const categoriesData = data
      ?.map((item) => item.abilities)
      .map((item) => item.map((item) => item.ability.name));

    for (let i = 0; i < categoriesData.length; i++) {
      if (!completeAbilities.includes(...categoriesData[i]))
        completeAbilities.push(...categoriesData[i]);
    }

    setAbilities(completeAbilities);
  };
  const completeCharacterstic = [];

  const fetchCharacteristics = () => {
    const char = data
      ?.map((item) => item.types)
      ?.map((item) => item?.map((item) => item.type.name));

    for (let i = 0; i < char.length; i++) {
      if (!completeCharacterstic.includes(...char[i]))
        completeCharacterstic.push(...char[i]);
    }
    setCharacteristics(completeCharacterstic);
  };

  let uniqueSpecies = [];
  const fetchSpecies = () => {
    const species = data.map((item) => item.species.name);
    for (let i = 0; i < species.length; i++) {
      if (!uniqueSpecies.includes(species[i])) uniqueSpecies.push(species[i]);
    }
    setSpecies(uniqueSpecies);
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchAbilities();
    fetchCharacteristics();
    fetchSpecies();
  }, [data]);

  const sortAbilitiesHandler = async (e) => {
    setLoading(true);
    setData(await filterPokemonByAbility(data, e.target.value));
    setLoading(false);
  };
  const sortCharacteristicsHandler = async (e) => {
    setLoading(true);
    setData(await filterPokemonByGroup(data, e.target.value));
    setLoading(false);
  };
  const sortSpeciesHandler = async (e) => {
    setLoading(true);
    setData(filterPokemonBySpecies(data, e.target.value));
    setLoading(false);
  };
  // console.log(data);
  return (
    <div>
      <Box>
        <div className="flex justify-around w-1/2 m-auto">
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Abilities"
            onChange={(e) => sortAbilitiesHandler(e)}
            defaultValue={"All"}
          >
            <MenuItem value="All" disabled>
              --Please Select a Ability --
            </MenuItem>
            {abilities.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>{" "}
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Characterstic"
            onChange={(e) => sortCharacteristicsHandler(e)}
            defaultValue={"All"}
          >
            <MenuItem value="All" disabled>
              --Please Select a type --
            </MenuItem>
            {characteristic.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Species"
            onChange={(e) => sortSpeciesHandler(e)}
            defaultValue={"All"}
          >
            <MenuItem value="All" disabled>
              --Please Select a Species --
            </MenuItem>
            {species.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </div>
      </Box>
      <div className="w-4/5 m-auto flex flex-wrap  justify-center">
        {loading ? (
          <Loader />
        ) : (
          data?.map((item, index) => {
            if (data.length === index + 1) {
              return (
                <Link key={item?.name} to={`/detail/:${item?.name}`}>
                  {" "}
                  <div
                    ref={lastPokemonElementRef}
                    className="text-center mt-4 w-fit m-10"
                    key={item?.index}
                  >
                    <CardTemp
                      attack={item?.stats[1]?.base_stat}
                      defence={item?.stats[0]?.base_stat}
                      name={item?.name}
                      url={
                        item?.sprites.other["official-artwork"].front_default
                      }
                    />
                  </div>
                </Link>
              );
            } else {
              return (
                <Link key={item?.name} to={`/detail/:${item?.name}`}>
                  <div
                    ref={lastPokemonElementRef}
                    className="text-center mt-4 w-fit m-10"
                    key={item?.name}
                  >
                    <CardTemp
                      attack={item?.stats[1]?.base_stat}
                      defence={item?.stats[0]?.base_stat}
                      name={item?.name}
                      url={
                        item?.sprites.other["official-artwork"].front_default
                      }
                    />
                  </div>
                </Link>
              );
            }
          })
        )}
      </div>
    </div>
  );
};

export default Listings;
