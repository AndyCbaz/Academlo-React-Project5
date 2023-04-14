import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';


const getPokemonById = async (id) => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const PokemonDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const pokemon = await getPokemonById(id);
      setPokemon(pokemon);
    };
    if (!state?.pokemon) loadData();
    else setPokemon(state.pokemon);
    // loadData();
  }, []);
  return (
    <>
      {pokemon && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            border: "solid",
            width:'100%',
            borderColor: "#FF1509",
            borderRadius: 4,
            // m: 4,
            py:2
          }}
        >
         
          <Typography variant="h4" color="error">
            INFORMACION DEL POKEMON
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {pokemon.name.toUpperCase()}
          </Typography>
          <Box sx={{ display: "flex", pt: 4 }}>
            
            <img
            
              src={pokemon.sprites.other.dream_world.front_default}
              alt={pokemon.name}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography
              variant="h5"
              sx={{ color: "#FF1509", fontWeight: "bold" }}
            >
              Tipo:
            </Typography>
            {pokemon.types.map((array) => (
              <Box>
                <Typography variant="h5">{array.type.name}</Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography
              variant="h5"
              sx={{ color: "#FF1509", fontWeight: "bold" }}
            >
              Habilidades:
            </Typography>
            {pokemon.abilities.map((array) => (
              <Box>
                <Typography variant="h5">{array.ability.name}</Typography>
              </Box>
            ))}
          </Box>
          
          <Box sx={{ display: "flex", gap: 2, borderRadius:4, boxShadow:4, background: '#FFC67E', p:4 }}>
            <Typography
              variant="h5"
              sx={{ color: "#FF1509", fontWeight: "bold" }}
            >
              STATS:
            </Typography>
            <Box sx={{ display: "flex", gap:4 }}>
              <Box sx={{display:'flex', flexDirection:'column'}}>
                {pokemon.stats.map((array) => (
                  <Box>
                    <Typography variant="h5">{array.stat.name}</Typography>
                  </Box>
                ))}
              </Box>
              <Box sx={{display:'flex', flexDirection:'column'}}>
                {pokemon.stats.map((array) => (
                  <Box>
                    <Typography variant="h5">{array.base_stat}</Typography>
                  </Box>
                ))}
              </Box>
              
            </Box>
          </Box>

          {/* <p>El id del pokemon seleccionado es: {id} </p> */}
        </Box>
      )}
    </>
  );
};
