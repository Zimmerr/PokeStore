import React, { useEffect } from 'react';
import Loja from './Loja'
import {ThemeProvider } from 'styled-components';
import usePokeTheme from './usePokeTheme'


const LojaAgua = () =>{
  const [theme, setMode, mountedComponent] = usePokeTheme();


  useEffect(() => {
    setMode("waterTheme");
  }, [])

  if(!mountedComponent) return <div/>
  return (
    <ThemeProvider theme={theme}>
      <Loja pokemonType="water"/>
    </ThemeProvider>
  );

}

export default LojaAgua;