import axios from "axios";

export const removeDuplicatesFromArray = (array) => {
  let uniqueArr = [];

  for (let i = 0; i < array?.length; i++) {
    for (let j = 0; j < array[i]?.name.length; j++) {
      uniqueArr.push({ name: array[i].name[j], url: array[i].url });
    }
  }

  return uniqueArr;
};
export const filterPokemonByAbility = async (pokemonDatas, abilityName) => {
  const batchSize = 100; // Number of Pokemon to fetch in each batch
  const totalPokemon = 1000; // Total number of Pokemon available

  const batchCount = Math.ceil(totalPokemon / batchSize);
  const pokemonResponses = [];

  for (let i = 0; i < batchCount; i++) {
    const startId = i * batchSize + 1;
    const endId = Math.min((i + 1) * batchSize, totalPokemon);

    const pokemonRequests = Array.from(
      { length: endId - startId + 1 },
      (_, index) =>
        axios.get(`https://pokeapi.co/api/v2/pokemon/${startId + index}`)
    );

    const batchResponses = await Promise.all(pokemonRequests);
    pokemonResponses.push(...batchResponses);
  }

  const pokemonData = pokemonResponses.map((response) => response.data);

  return pokemonData.filter((pokemon) => {
    return pokemon.abilities.some(
      (ability) =>
        ability.ability.name.toLowerCase() === abilityName.toLowerCase()
    );
  });
};

export const filterPokemonByGroup = async (pokemonDatas, groupName) => {
  const batchSize = 100; // Number of Pokemon to fetch in each batch
  const totalPokemon = 1000; // Total number of Pokemon available

  const batchCount = Math.ceil(totalPokemon / batchSize);
  const pokemonResponses = [];

  for (let i = 0; i < batchCount; i++) {
    const startId = i * batchSize + 1;
    const endId = Math.min((i + 1) * batchSize, totalPokemon);

    const pokemonRequests = Array.from(
      { length: endId - startId + 1 },
      (_, index) =>
        axios.get(`https://pokeapi.co/api/v2/pokemon/${startId + index}`)
    );

    const batchResponses = await Promise.all(pokemonRequests);
    pokemonResponses.push(...batchResponses);
  }

  const pokemonData = pokemonResponses.map((response) => response.data);
  return pokemonData.filter((pokemon) => {
    return pokemon?.types
      ?.map((item) => item.type.name)
      .includes(groupName?.toLowerCase());
  });
};
export const filterPokemonBySpecies = (pokemonData, speciesName) => {
  return pokemonData.filter((pokemon) => {
    return pokemon.species.name === speciesName;
  });
};
export const filterPokemonByNames = async (pokemonNames) => {
  const pokemonsPromise = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0"
  );
  const pokemons = await Promise.resolve(pokemonsPromise);
  // console.log(pokemons);
  const datasPromise = pokemons?.data?.results.map(
    async (item) => await axios.get(item.url)
  );
  const datas = Promise.all(datasPromise).then((res) => console.log(res));

  const filteredData = datas?.filter((pokemon) => {
    return pokemonNames?.includes(pokemon.location_area_encounters);
  });

  return filteredData;
};
