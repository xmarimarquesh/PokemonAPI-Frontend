import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [pokemonId, setPokemonId] = useState<number>(0);
  const [pokemonName, setPokemonName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [capturedPokemons, setCapturedPokemons] = useState<any[]>([]);

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  const fetchRandomPokemon = async () => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1");
      const totalPokemons = response.data.count; 
      const randomId = Math.floor(Math.random() * totalPokemons) + 1;
      
      console.log("Total: ",totalPokemons)

      const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId.toString()}`);
      setPokemonId(randomId); 
      setPokemonName(pokemonResponse.data.name); 
    } catch (error) {
      console.error("Erro ao buscar Pokémon aleatório:", error);
    }
  };

  const capturePokemon = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/capture", { id: pokemonId });
      setMessage(`Pokémon ${response.data.pokemon.name} capturado com sucesso!`);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Erro na captura!");
    }
  };

  const fetchCapturedPokemons = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/team");
      setCapturedPokemons(response.data);
    } catch (error) {
      console.error("Erro ao buscar Pokémons capturados");
    }
  };

  return (
    <div className="bg-root flex flex-col items-center">
      <Image src={require("@/assets/capa.jpg")} alt="" className="h-100 object-cover" />
      <div className="h-30">
        <h1 className="text-amber-500 font-bold text-[2.4em] mt-10 hover:text-[2.6em] cursor-pointer transform-stroke">
          Pokemon - API
        </h1>
      </div>

      <div className="h-30">
        <h2 className="text-white text-xl">Pokémon Aleatório: {pokemonName}</h2>
      </div>

      <div className="h-30">
        <button
          onClick={capturePokemon}
          className="text-white bg-amber-500 m-10 p-4 rounded-md font-bold text-2xl hover:bg-amber-600"
        >
          Tentar capturar
        </button>
      </div>
      
      <div className="w-[80%] bg-white h-[1px]" />

      <div className="mt-5">
        <h1 className="text-white font-bold text-2xl hover:text-[1.6em] cursor-pointer">My Pokemons</h1>
        <button
          onClick={fetchCapturedPokemons}
          className="text-white bg-amber-500 m-10 p-4 rounded-md font-bold text-2xl hover:bg-amber-600"
        >
          Ver meu time
        </button>
        <div>
          {capturedPokemons.length > 0 ? (
            <ul>
              {capturedPokemons.map((pokemon: any) => (
                <li className="text-white" key={pokemon.id}>{pokemon.name}</li>
              ))}
            </ul>
          ) : (
            <p className="text-white">Você não tem Pokémons capturados ainda.</p>
          )}
        </div>

        {message && <p className="text-white">{message}</p>}
      </div>
    </div>
  );
}
