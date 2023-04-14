import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/system";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const PokedexLayout = () => {
  const {removeUser} = useContext(UserContext)
  return (
    <Container maxWidth="xl">
      <Box sx={{ display: "flex", justifyContent:'space-between', alignItems:'center'}}>
        <img src="/LogoHome.png" alt="logo" />
        <Button onClick={removeUser} variant="contained" color="error" sx={{height:'50px'}} >Cerrar Sesión</Button>
      </Box>
      <Outlet />
    </Container>
  );
};
