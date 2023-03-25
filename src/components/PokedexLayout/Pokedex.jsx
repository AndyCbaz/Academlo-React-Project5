import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { PokemonCard } from "../PokemonCard";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Grid } from "@mui/material";

const theme = createTheme();

export const Pokedex = () => {
  //Constnates de pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(20);
  ///************** */
  const getAllPokemons = async () => {
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?limit=${cardsPerPage}&offset=${
          currentPage * 20
        }`
      );
      return res.data.results;
    } catch (error) {
      console.error(error);
    }
  };
  //*********************** */
  const { user } = useContext(UserContext);
  const [pokemons, setPokemons] = useState([]);
  //Funcion de llamado de api por numero de pokemones

  //**************
  // Funcion de carga de pokemones en espera a que se ejecuten todos */
  const loadAllPokemons = async () => {
    const allPokemons = await getAllPokemons();
    setPokemons(allPokemons);
  };
  //****************** */
  useEffect(() => {
    loadAllPokemons();
  }, [currentPage]);
  const handleChange = (e, value) => {

    e.preventDefault();
    setCurrentPage(value);
  };

  return (
    <ThemeProvider theme={theme}>
      {pokemons && (
        <>
        
          <h1>Pokedex</h1>
          <p>
            <span> Bienvenido {user}, </span>
            aqui podras encontrar tu juego favorito
          </p>
          <Container sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
          <Container sx={{ py: 4 }} maxWidth="lg">
            <Grid container spacing={2}>
              {pokemons.map((pokemon) => (
                <Grid item key={pokemon} xs={12} sm={6} md={2.4}>
                  <PokemonCard key={pokemon.url} pokemonData={pokemon} />
                </Grid>
              ))}
            </Grid>
          </Container>
          <Pagination count={100} page={currentPage} onChange={handleChange} sx={{textAlign: 'center'}} />
        </Container>
        </>
      )}
    </ThemeProvider>
  );
};
