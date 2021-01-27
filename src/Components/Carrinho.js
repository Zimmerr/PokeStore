import React, { useRef, useState } from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ItemCarrinho from './ItemCarrinho'
import formatMoney from '../utils/formatMoney'
import Modal from './Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import * as pokebolaURL from '../assets/pokebola.png'
import OutlineButton from './styled/OutlineButton';

const Cart = styled.div`
  /* display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  flex: 1 1 0px; */
  display: grid;
  background: white; 
  grid-template-rows: 6% 80% 7% 7%;
  grid-column: 2 / 3;
  padding: 0;
  height: 93vh;
  
  
  
  @media (max-width: 1000px) {
    width: 0;
    position: fixed;
    z-index: 2; 
    right: 0;
    transition: 0.5s;
  }
`;

const CollapseCart = styled.div`
  height: 100%; 
  width: 0;
  background: rgba(0, 0, 0, 0.5); 
  position: fixed;
  z-index: 1; 
  
  @media (min-width: 1000px){
    display: none;
  }
`;

const FloatingButton = styled.a`
  position: fixed;
  width:60px;
	height:60px;
	bottom:40px;
	right:40px;
  border-radius:50px;
	text-align:center;
	box-shadow: 2px 2px 3px #999;
  color: white;
  z-index: 3;
  background-color: ${props => props.theme.floatingButtonColor};
  
  p{
    font-size: 20px;
    margin-top: 10px;
  }
  @media (min-width: 1000px){
    display: none;
  }
`;

const CartTitle = styled.div`
  background: white;
  color: ${props => props.theme.buttonColor};
  font-size: 2em;
  height: 100%;
  text-align: center;
  border-bottom: 2px solid #EDEDED;

  p{
    display: inline;
    margin-left: 1vh;
  }
  @media(max-height: 900px){
    font-size: 1.6em;
  }
  @media(max-width: 1000px){
    font-size: 1.4em;
  }
`;

const CartContent = styled.div`
  overflow: auto;
  display:flex;
  flex-direction: column;
  overflow-x: hidden;
`;

const CartSummary = styled.div`
  margin: auto 5px auto 5px;
  font-size: 1.3em;
  .totalLabel{
    margin: auto;
    float: left;
    text-transform: uppercase
  }
  .totalNumber{
    float:right;
    margin: auto;
    letter-spacing: 1px;
  }
`;

const CartFinish = styled.div`
  height: 100%;

  button{
    width: 100%;
    height: 100%;
    p{
      display: inline;
      margin-left: 1vh;
    }
  }

`;

const ModalContent = styled.div`
  display: grid;
  grid-template-areas:
    'header header'
    'image main';
  grid-gap: 10px;
  padding: 2vh;
  

  .title {
    grid-area: header; 
    text-align: center;
    font-weight: 400;
    font-size: 3rem;
  }

  img {
    grid-area: image;
    width: 400px;
    height: 400px;
    padding: 5vh;
    max-width: 100%;
    max-height: 100%;
  }
  .content {
    grid-area: main; 
    font-size: 2rem;
  }

  @media(max-width: 1000px){
    grid-template-areas:
    'header'
    'image'
    'main';

    img{
      height: auto;
    }
  }
`;

const Carrinho = ({carrinho, clearCart, removeItem, editQuantity}) => {
  const refCart = useRef(null);
  const refCollapse = useRef(null);
  const refModal = useRef(null);
  const refFloatButton = useRef(null);

  let toggleCart = () => {
    refCart.current.style.width = refCart.current.style.width === "80%" ? "0px" : "80%";
    refCollapse.current.style.width = refCollapse.current.style.width === "100%" ? "0px" : "100%";
    refFloatButton.current.style.display = refFloatButton.current.style.display === "none" ? "block" : "none";
  }

  let toggleModal = () => {
    refModal.current.style.display = refModal.current.style.display === "block" ? "none" : "block";
  }

  let finishOrder = () => {
    if(carrinho.length){
      clearCart();
      toggleModal();
      if(window.outerWidth < 1000)toggleCart();
    }
  }

  return (
    <>
      <CollapseCart onClick={() => {toggleCart()}} ref={refCollapse}/>
      <Cart ref={refCart}>
        <CartTitle>
          <FontAwesomeIcon icon={faShoppingCart} />
          <p>Carrinho</p>
        </CartTitle>
        <CartContent>
          {carrinho.map((pokemon, index) => {
            if(pokemon.sprite) 
              return (
                <ItemCarrinho key={index} pokemon={pokemon} removeItem={removeItem} editQuantity={editQuantity}/>
              )
          })}
        </CartContent>
        <CartSummary>
          <p className="totalLabel">Total: </p>
          <p className="totalNumber">R$ {formatMoney(carrinho.reduce((prev, current)=> prev + current.price * current.quantidade, 0))} </p>
        </CartSummary>
        <CartFinish>
          <OutlineButton onClick={() => finishOrder()}>
            <FontAwesomeIcon icon={faCartArrowDown} />
            <p>Finalizar Compra</p>
          </OutlineButton>
        </CartFinish>
      </Cart>
      <FloatingButton ref={refFloatButton} onClick={() => {toggleCart()}}>
      <p><FontAwesomeIcon icon={faShoppingCart} /> {carrinho.length}</p>
      </FloatingButton>
      <Modal ref={refModal} handleClose={toggleModal}>
        <ModalContent>
          <p className="title">Compra Finalizada!</p>
          <img src={pokebolaURL.default} alt="Pokebola"/>
          <p className="content">Obrigado pela Compra! Seus pokemons serão capturados e em breve entregues a você!</p>

        </ModalContent>
      </Modal>
    </>
  );
}

Carrinho.propTypes = {
  clearCart: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  carrinho: PropTypes.array.isRequired,
  editQuantity: PropTypes.func.isRequired,
}

export default Carrinho;