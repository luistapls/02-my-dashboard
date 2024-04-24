import { PokemonGrid, PokemonsResponse, SimplePokemon } from '@/pokemons';

const getPokemons = async (limit = 20, offSet = 0): Promise<SimplePokemon[]> => {
  const data: PokemonsResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offSet}`
  ).then((response) => response.json());

  const pokemons = data.results.map((pokemon) => ({
    id: pokemon.url.split('/').at(-2)!,
    name: pokemon.name,
  }));

  return pokemons;
};

export default async function PokemonsPage() {
  const pokemons = await getPokemons(150);

  return (
    <div className='flex flex-col'>
      <span className='text-5xl my-2'>
        Listado de Pokemons <small>estático</small>
      </span>
      <PokemonGrid pokemons={pokemons} />
    </div>
  );
}
