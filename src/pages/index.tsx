"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "@/components/card";

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
      window.location.reload();
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Erro ao capturar Pokémon!");
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
      <div className="mt-8">
        <Card imagem={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`} nome={pokemonName} species={""} height={""} weight={""} scape={""} />
      </div>

      <div className="h-30 relative group mb-8 w-[100%] flex flex-col items-center ">
        <Image
          className="cursor-pointer hover:scale-125 transition duration-300 ease-in-out"
          width={80}
          onClick={capturePokemon}
          src={require('@/assets/pokeball.png')}
          alt=""
        />
        <div className="tooltip absolute left-1/2 transform -translate-x-1/2 bottom-[-20px] text-white bg-black text-md p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Capturar
        </div>

        <div className="mt-25 w-[100%] flex items-center justify-center">
          {message && <p className="text-black absolute bg-amber-50 w-[40%] p-4 text-center rounded-md">{message}</p>}
        </div>

      </div>

      <div className="w-[80%] bg-white h-[1px] mt-22" />

      <div className="mt-5 flex flex-col items-center">
        <h1 className="text-white font-bold text-2xl hover:text-[1.6em] cursor-pointer">My Pokemons</h1>
        <button
          onClick={fetchCapturedPokemons}
          className="text-white cursor-pointer bg-amber-500 m-10 p-4 rounded-md font-bold text-2xl hover:bg-amber-600"
        >Ver meu time ↓
        </button>
        <div className="flex flex-wrap w-[100%] items-center justify-center">
            {capturedPokemons.length > 0 ? (
              capturedPokemons.map((pokemon: any) => (
                <div key={pokemon.id}>
                  <Card imagem={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} nome={pokemon.name} species={pokemon.species} height={pokemon.height} weight={pokemon.weight} scape={pokemon.type} />
                </div> 
              ))
            ) : (
              <p className="text-white">Você não tem Pokémons capturados ainda.</p>
            )}
        </div>


        
      </div>
    </div>
  );
}
