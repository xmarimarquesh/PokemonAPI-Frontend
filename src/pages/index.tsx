"use client";
import Image from "next/image";
import { useState } from 'react';
import axios from 'axios';

export default function Home() {

  const [pokemonId, setPokemonId] = useState<number>(1);
  const [message, setMessage] = useState<string>('');
  const [capturedPokemons, setCapturedPokemons] = useState<any[]>([]);

  const capturePokemon = async () => {
    try {
      const response = await axios.post('/localhost:/8080/capture', { id: pokemonId }); 
      setMessage(`Pokémon ${response.data.pokemon.name} capturado com sucesso!`);
    } catch (error:any) {
      setMessage(error.response?.data?.message || 'Erro na captura!');
    }
  };

  const fetchCapturedPokemons = async () => {
    try {
      const response = await axios.get('/team');
      setCapturedPokemons(response.data);
    } catch (error) {
      console.error('Erro ao buscar Pokémons capturados');
    }
  };

  return (
    <div className="bg-root flex flex-col items-center">
      <Image src={require('@/assets/capa.jpg')} alt="" className="h-100 object-cover"></Image>
      <div className="h-30">
        <h1 className="text-amber-500 font-bold text-[2.4em] mt-10 hover:text-[2.6em] cursor-pointer transform-stroke">Pokemon - API</h1>
      </div>
      <div className="h-30">
        <button 
          onClick={capturePokemon}
          className="text-white bg-amber-500 m-10 p-4 rounded-md font-bold text-2xl hover:bg-amber-600">
          Tentar capturar
        </button>
      </div>
      <div className="w-[80%] bg-white h-[1px]"></div>
      <div className="mt-5">
        <h1 className="text-white font-bold text-2xl hover:text-[1.6em] cursor-pointer" >My Pokemons</h1>
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
                <li key={pokemon.id}>{pokemon.name}</li>
              ))}
            </ul>
          ) : (
            <p>Você não tem Pokémons capturados ainda.</p>
          )}
        </div>
      {message && <p className="text-white">{message}</p>}
      </div>
    </div>
  );
}
