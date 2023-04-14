import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const loadPokemon = async () => {
    const pokemonInfo = await getPokemonById(pokemonData.url);
    setPokemon(pokemonInfo);
  };

  const handleClickNavigate = () => {
navigate(`/pokedex/${pokemon.id}`)
  }

  useEffect(() => {
    loadPokemon();
  }, []);
  return (
    <>
      {pokemon && (
        <Card
        onClick={handleClickNavigate}
          sx={{
            width: 200,
            border: "solid",
            borderColor:
              pokemon.types[0].type.name == "fire"
                ? "#EE7D2F"
                : pokemon.types[0].type.name == "grass"
                ? "#76D7C4"
                : pokemon.types[0].type.name == "bug"
                ? "#B2ECE5"
                : pokemon.types[0].type.name == "water"
                ? "#4FC0ED"
                : pokemon.types[0].type.name == "normal"
                ? "gray"
                : pokemon.types[0].type.name == "fighting"
                ? "#DDE5A8"
                : pokemon.types[0].type.name == "flying"
                ? "#E0F3F5"
                : pokemon.types[0].type.name == "poison"
                ? "#BF9AEC"
                : pokemon.types[0].type.name == "ground"
                ? "#B68D18"
                : pokemon.types[0].type.name == "rock"
                ? "#979796"
                : pokemon.types[0].type.name == "ghost"
                ? "#6D19DE"
                : pokemon.types[0].type.name == "steel"
                ? "#78737E"
                : pokemon.types[0].type.name == "electric"
                ? "#F1F64D"
                : pokemon.types[0].type.name == "psychic"
                ? "#E486BE"
                : pokemon.types[0].type.name == "ice"
                ? "#79F9F7"
                : pokemon.types[0].type.name == "dragon"
                ? "#FEC30C"
                : pokemon.types[0].type.name == "dark"
                ? "#3B3A37"
                : pokemon.types[0].type.name == "fairy"
                ? "#D866CA"
                : pokemon.types[0].type.name == "shadow"
                ? "#A796A5"
                : "#F8ECF6"

          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              // height="140"
              image={pokemon.sprites.front_default}
              alt="pokemon"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {pokemon.species.name}
              </Typography>
              <Typography>{pokemon.types[0].type.name}</Typography>
              <Box>
                {pokemon.stats.map((stat) => (
                  <Box key={stat.stat.name}>
                    <Typography>{stat.stat.name.toUpperCase()}</Typography>
                    <Typography>{stat.base_stat}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </>
  );
};
