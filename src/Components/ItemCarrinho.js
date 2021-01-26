import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 22% 63% 15%;
  grid-template-rows: repeat(1, 100%);
  width: 100%;
  border-bottom: 2px solid #EDEDED;

  @media(max-width: 1000px){
    grid-template-columns: 35% 50% 15%;
  }
`;

const ItemImg = styled.div`
  border-right: 1px solid #EDEDED;
  img{
    text-align: center;
  }
  grid-column: 1/2;
`;

const ItemInfo = styled.div`
  grid-column: 2/3;
  padding: 1vh;
  

  .name{
    font-size: 1.7rem;
    font-weight: 600;
    margin-bottom: auto; 
  }

  .price{
    font-size: 1.3rem;
    margin-top: auto;
    margin-bottom: auto;
  }
`;

const ItemDelete = styled.button`
  grid-column: 3/4;
  background-color: transparent; 
  border: none;
  color: ${props => props.theme.buttonColor}; 
  padding: 12px 16px;
  font-size: 16px; 
  cursor: pointer;

  :hover {
    filter: brightness(0.7);
  }
`;

const ItemCarrinho = ({pokemon, removeItem}) => {
  return (
    <CartItem>
      <ItemImg>
        <img alt = {pokemon.name} src={pokemon.sprite} />
      </ItemImg>
      <ItemInfo>
        <p className="name">{pokemon.name}</p>
        <p className="price">R$ {pokemon.price.toFixed(2)}</p>
      </ItemInfo>
      <ItemDelete onClick={() => removeItem(pokemon)}>
        <FontAwesomeIcon icon={faTimes} size="lg"/>
      </ItemDelete>

    </CartItem>
  )
}

ItemCarrinho.propTypes = {
  pokemon: PropTypes.object.isRequired,
  removeItem: PropTypes.func.isRequired,
};

export default ItemCarrinho;
