import React, { Component } from 'react';
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

class Loja extends Component {
  static propTypes = {
    pokemonType: PropTypes.string.isRequired,
    addNewItem: PropTypes.func.isRequired,
    clearCart: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    carrinho: PropTypes.array.isRequired,
  };

  render() {
    const {addNewItem, clearCart, carrinho, pokemonType, removeItem} = this.props
    return (
      <ContentStyled>
        <PokemonLista pokemonType={pokemonType} addNewItem={addNewItem} />
        <Carrinho carrinho={carrinho} clearCart={clearCart} removeItem={removeItem}/>
      </ContentStyled>
    );
  }
}

export default Loja;