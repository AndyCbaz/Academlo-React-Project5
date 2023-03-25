import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";





const getPokemonById = async (url) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
export const PokemonCard = ({ pokemonData }) => {
  const [pokemon, setPokemon] = useState(null);

  const loadPokemon = async () => {
    const pokemonInfo = await getPokemonById(pokemonData.url);
    setPokemon(pokemonInfo);
  };

  useEffect(() => {
    loadPokemon();
  }, []);
  return (
    <>
      {pokemon && (
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={pokemon.sprites.front_default}
              alt="pokemon"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {pokemon.species.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </>
  );
};
