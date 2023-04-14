import React, { useContext, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { UserContext } from "../context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";

export const Home = () => {
  const [nameValue, setNameValue] = useState("");
  const [nameError, setnameError] = useState(null);
  const {user, saveUser} = useContext(UserContext);
  const navigate = useNavigate();

  // Validacion de nombre ingresado
  const handleChange = (e) => {
    const newNameValue = e.target.value;
    setNameValue(newNameValue);
    if (newNameValue == "") {
      setnameError("The name is required");
    }
     else if (!/^[a-zA-Z ]{5,}$/.test(newNameValue)) {
      setnameError("Only letters and blanck are allowed and minimum must be 5 letters");
    }
    else setnameError(null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!nameError) {
      saveUser(nameValue)
      navigate('/pokedex')
    }
  }

  
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <img src="/LogoHome.png" alt="pokedex" height="100vh" />
          <Typography
            variant="h2"
            sx={{ textAlign: "center" }}
            gutterBottom
            style={{ color: "#EC2E18" }}
          >
            !Hola entrenador¡
          </Typography>
          <Typography variant="h5" sx={{ textAlign: "center", mb: "20px" }}>
            Para poder comenzar, dame tu nombre
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              value={nameValue}
              onChange={handleChange}
              color="error"
              type='text'
              sx={{ display: "flex" }}
              label="Ingrese su Nombre"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SportsEsportsIcon style={{ color: "#EC2E18" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button type="submit" color="error" variant="contained">
                      Start
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </form>
          {nameError && (
            <Typography
              variant="h5"
              sx={{ textAlign: "center" }}
              gutterBottom
              style={{ color: "#EC2E18" }}
            >
              {nameError}
            </Typography>
          )}
          {user && <Navigate to="/pokedex" replace/>}
        </Box>
      </Container>
    </React.Fragment>
  );
};
