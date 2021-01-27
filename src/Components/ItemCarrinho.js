import React, {useState} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 22% 38% 25% 15%;
  grid-template-areas:    
    'image info quantity delete';
  grid-template-rows: repeat(1, 100%);
  width: 100%;
  border-bottom: 2px solid #EDEDED;

  @media(max-width: 1000px){
    grid-template-columns: 35% 50% 15%;
    grid-template-rows: 65% 35%;
    grid-template-areas:    
    'image info delete'
    'image quantity delete';
  }
`;

const ItemImg = styled.div`
  border-right: 1px solid #EDEDED;
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    text-align: center;
    max-width: 100%;
  }
  grid-area: image;
`;

const ItemInfo = styled.div`
  grid-area: info;
  padding: 1vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  

  .name{
    font-size: 1.7rem;
    font-weight: 600;
    margin: 0; 
  }

  .price{
    font-size: 1.3rem;
    margin: 0; 
  }

  @media(max-width: 1000px){
    max-height: 100%;
    .name{
      
    }
  }

`;

const ItemQuantity = styled.div`
  grid-area: quantity;
  margin-top: auto;
  margin-bottom: auto;
  display: inline-block;
  position: relative;
  font-size: 0;
  overflow: hidden;
  border-radius: 3px;
  width: calc(28px*3);
  height: 28px;
  button {
    display: block;
    width: calc(28px * 1.2);
    height: 28px;
    position: absolute;
    margin: 0;
    padding: 0;
    border: 0;
    background: transparent;
    color: ${props => props.theme.buttonColor};;
    font-size: calc(28px * 0.7);
    line-height: 1;
    cursor: pointer;
    :focus {
      outline: none;
    }
    :hover{
      filter: brightness(0.7);
    }
    :disabled {
      color: #999;
      cursor: default;
    }
    :first-child {
      left: 0;
      bottom: 0;
    }
    :last-child {
      right: 0;
      top: 0;
    }
  }
  input[type="number"] {
    position: absolute;
    outline:none;
    top: 0;
    left: 28px;
    width: 28px;
    height: 28px;
    margin: 0;
    padding: 0 0;
    border: 0;
    font-weight: bold;
    text-align: center;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  @media(max-width: 1000px){
    margin: 1vh;
  }
`;  

const ItemDelete = styled.button`
  grid-area: delete;
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

const ItemCarrinho = ({pokemon, removeItem, editQuantity}) => {
 
  return (
    <CartItem>
      <ItemImg>
        <img alt = {pokemon.name} src={pokemon.sprite} />
      </ItemImg>
      <ItemInfo>
        <p className="name">{pokemon.name}</p>
        <p className="price">R$ {pokemon.price.toFixed(2)}</p>
      </ItemInfo>
      <ItemQuantity>
        <button onClick={() => editQuantity(pokemon, pokemon.quantidade-1)} disabled={pokemon.quantidade === 1}><FontAwesomeIcon icon={faMinus} size="xs"/></button>
        <input type="number" name="thirdQty" value={pokemon.quantidade} readOnly={true}/>
        <button onClick={() => editQuantity(pokemon, pokemon.quantidade+1)}><FontAwesomeIcon icon={faPlus} size="xs"/></button>
      </ItemQuantity>
      <ItemDelete onClick={() => removeItem(pokemon)}>
        <FontAwesomeIcon icon={faTimes} size="lg"/>
      </ItemDelete>

    </CartItem>
  )
}

ItemCarrinho.propTypes = {
  pokemon: PropTypes.object.isRequired,
  removeItem: PropTypes.func.isRequired,
  editQuantity: PropTypes.func.isRequired,
};

export default ItemCarrinho;
