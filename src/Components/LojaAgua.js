import React, { useEffect, useState } from 'react';
import Loja from './Loja'
import {ThemeProvider } from 'styled-components';
import usePokeTheme from './usePokeTheme'


const LojaAgua = () =>{
  const [theme, setMode, mountedComponent] = usePokeTheme();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setMode("waterTheme");
    const localCart = window.localStorage.getItem('cartWater');
    localCart && setCart(JSON.parse(localCart))
  }, [])

  const addNewItem = item => {
      console.log(item)
      let newCart = [...cart, item];
      console.log(newCart)
      window.localStorage.setItem('cartWater', JSON.stringify(newCart))
      setCart(newCart)
      console.log(cart);
  };

  const removeItem = item =>{
    let oldCart = cart;
    let newCart = oldCart.filter(element => element.name !== item.name)
    window.localStorage.setItem('cartFire', JSON.stringify(newCart))
    setCart(newCart)
  }

  const clearCart = () => {
    window.localStorage.removeItem('cartWater')
    setCart([])
  }



  //render() {
    if(!mountedComponent) return <div/>
    return (
      <ThemeProvider theme={theme}>
        <Loja pokemonType="water" carrinho={cart} addNewItem={addNewItem} clearCart={clearCart} removeItem={removeItem}/>
      </ThemeProvider>
    );
  //}
}

export default LojaAgua;