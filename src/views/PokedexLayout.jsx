import React from 'react'
import { Outlet } from 'react-router-dom'

export const PokedexLayout = () => {
  return (
    <div>
      <h1>Pokedex Layout</h1>
      <Outlet /> 
    </div>
  )
}
