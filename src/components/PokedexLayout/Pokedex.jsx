import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { PokemonCard } from "../PokemonCard";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Button,
  InputAdornment,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";

import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Form, useLoaderData } from "react-router-dom";
import { usePagination } from "../../hooks/usePagination";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";


const theme = createTheme();

export const Pokedex = () => {
  const { types, pokemons, name, type } = useLoaderData();

  const [pokemonName, setPokemonName] = useState(name ?? '');
  const [pokemonType, setPokemonType] = useState(type ?? '');

  //*********************** */
  const { user } = useContext(UserContext);
  const pokemonsPagination = usePagination(pokemons, 20);
  //Paginacion
  const handleChangePage = (event, value) => {
    pokemonsPagination.changePageTo(value);
  };
  //********************* */

  //** Manejadores */
  const handleNameChange = (e) => {
    e.preventDefault();
    setPokemonName(e.target.value);
    
  };

  const handleTypeChange = (e) => {
    e.preventDefault();
    setPokemonType(e.target.value);
    
    
  };

  //***** */
  // useEffect(() => {setPokemonName(name)}, [name]);
  // useEffect(() => {setPokemonType(type)}, [type]);
  //*** */

  return (
    <ThemeProvider theme={theme}>
      {pokemons && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Mensaje de Bienvenida */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="h5">
              <span style={{ color: "red" }}>Bienvenido {user}. </span> Aqui
              podras encontrar tu pokemon favorito
            </Typography>
            
          </Box>

          {/* Controles */}
          <Form>
            <Box sx={{ display: "flex", py: 2, gap: 4 }}>
              {/* Input de Busqueda */}
              <Box sx={{ display: "flex" }}>
                <TextField
                  color="error"
                  type="text"
                  value={pokemonName}
                  onChange={handleNameChange}
                  name="pokemon_name"
                  sx={{ display: "flex", width: "200px" }}
                  // label="Busca un pokemon"
                  placeholder="Busca un pokemon"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon style={{ color: "#EC2E18" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              {/* Select de Type */}
              <Box sx={{ display: "flex", width: "200px" }}>
                <FormControl>
                  <InputLabel color="error" id="demo-simple-select-label">
                    Tipos
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="pokemon_type"
                    sx={{ width: "200px" }}
                    color="error"
                    value={pokemonType}
                    label="Age"
                    onChange={handleTypeChange}
                  >
                    {types.map((type) => (
                      <MenuItem key={type.url} value={type.name}>
                        {type.name}
                      </MenuItem>
                    ))}
                    <MenuItem key={'default'} value={``}>Tipo</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Boton de Search */}
              <Box sx={{ display: "flex" }}>
                <Button variant="contained" color="error" type="submit">
                  Search
                </Button>
              </Box>
            </Box>

            {/* Pokedex */}
            <Pagination
              count={pokemonsPagination.pages.length}
              onChange={handleChangePage}
            />
            <Box
              sx={{
                py: 2,
                gap: 2,
                display: "flex",
                flexWrap: "wrap",
                width: "100%",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              {pokemonsPagination.listSlice.map((pokemon) => (
                <PokemonCard key={pokemon.url} pokemonData={pokemon} />
              ))}
            </Box>
          </Form>
        </Box>
      )}
    </ThemeProvider>
  );
};
