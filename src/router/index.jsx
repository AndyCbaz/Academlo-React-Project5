import { createBrowserRouter } from "react-router-dom";
import { Home } from "../views/Home";
import { PokedexLayout } from "../views/PokedexLayout";
import { PokemonDetail } from "../components/PokedexLayout/PokemonDetail";
import { Pokedex } from "../components/PokedexLayout/Pokedex";
import { ProtectedRoutes } from "../components/ProtecterRoutes/ProtectedRoutes";
import { pokedexLoader } from "./loader/pokedexLoader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/pokedex",
    element: (
      <ProtectedRoutes>
        <PokedexLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: ":id",
        element: <PokemonDetail />,
      },
      {
        index: true,
        element: <Pokedex />,
        loader: pokedexLoader,
      },
    ],
  },
  {
    path: "/",
  },
]);
