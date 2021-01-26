import React, { useEffect, useState } from 'react';
import Loja from './Loja'
import {ThemeProvider } from 'styled-components';
import usePokeTheme from './usePokeTheme'

const LojaFogo = () =>{
  const [theme, setMode, mountedComponent] = usePokeTheme();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setMode("fireTheme");
  },[])

  if(!mountedComponent) return <div/>
  return (
    <ThemeProvider theme={theme}>
      <Loja pokemonType="fire"/>
    </ThemeProvider>
  );
  
}

export default LojaFogo;