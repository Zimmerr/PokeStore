import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types'
import PokemonLista from './PokemonLista'
import Carrinho from './Carrinho'


const ContentStyled = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  grid-template-rows: repeat(1, 100%);

  @media(max-width: 1000px){
    grid-template-columns: 100%;
  }
`;

const Loja = ({pokemonType}) => {
  const [cart, setCart] = useState([]);

  const localStorageKey = pokemonType + 'Cart';

  useEffect(() => {
    const localCart = window.localStorage.getItem(localStorageKey);
    localCart && setCart(JSON.parse(localCart))
  }, [])

  const addNewItem = item => {
    let newCart;
    let oldCart = cart;
    let oldItem = oldCart.findIndex(el => el.name === item.name);
    if (oldItem >= 0){
      oldCart[oldItem].quantidade++;
      newCart = [...oldCart];
    }
    else{
      item.quantidade = 1;
      newCart = [...cart, item];
    }
    setCart(newCart)
    window.localStorage.setItem(localStorageKey, JSON.stringify(newCart))
    console.log(cart);
  };

  const editQuantity = (item, quantidade) => {
    let oldCart = cart;
    let itemIndex = oldCart.findIndex(el => el.name === item.name);
    oldCart[itemIndex].quantidade = quantidade;
    let newCart = [...oldCart]
    setCart(newCart)
    window.localStorage.setItem(localStorageKey, JSON.stringify(newCart))
  }

  const removeItem = item =>{
    let oldCart = cart;
    let newCart = oldCart.filter(element => element.name !== item.name)
    window.localStorage.setItem(localStorageKey, JSON.stringify(newCart))
    setCart(newCart)
  }

  const clearCart = () => {
    window.localStorage.removeItem(localStorageKey)
    setCart([])
  }
  
  return (
    <ContentStyled>
      <PokemonLista pokemonType={pokemonType} addNewItem={addNewItem} />
      <Carrinho carrinho={cart} clearCart={clearCart} removeItem={removeItem} editQuantity={editQuantity}/>
    </ContentStyled>
  );
}


Loja.propTypes = {
  pokemonType: PropTypes.string.isRequired,
};

export default Loja;