import React, {useRef} from 'react';
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import OutlineButton from './styled/OutlineButton'
import formatMoney from '../utils/formatMoney'

const PokeCard = styled.div `
  background: white;
  border: 1px solid #EDEDED;
  line-height: 1;
  flex-basis: 43%;
  margin: 10px auto 0;
  -webkit-box-shadow: 0px 0px 5px 0px #EDEDED; 
  box-shadow: 0px 0px 5px 0px #EDEDED;

  @media(min-width:768px){
    flex-basis: 22%;
    margin: 1%;
  }

  @media(min-width: 1280px){
    flex-basis: 14.5%;
    margin: 1%;
  }
`;

const PokeImg = styled.div`
  text-align: center;
`

const PokeInfo = styled.div `
  margin-top: auto;
  text-align: center;
  padding: 0;
  
  h5{
    font-size: 1.9rem;
    font-weight: inherit;
    letter-spacing: 1px;
    margin: 0;
    padding: 10px;
    height: 60px;
    vertical-align: middle;
  }
  h6{
    margin-top: 0;
    font-size: 1.4rem;
    font-weight: inherit;
  }
  button{
    width: 100%;
  }
`

const fadein = keyframes`
  0% {right: 0; opacity: 0;}
  100% {right: 30px; opacity: 1;}
`

const fadeout = keyframes`
  0% {right: 30px; opacity: 1;}
  100% {right: 0; opacity: 0;}
`

const SnackBarWrapper = styled.div`

  #snackBar{
    visibility: hidden; 
    width: 250px;
    max-width: 100%;
    margin-left: -125px;
    background-color: #333;
    color: #fff;
    text-align: center; 
    border-radius: 2px; 
    padding: 16px;
    position: absolute; 
    z-index: 1;

    top: 70px;
    right: 30px;

    @media(max-width: 1000px){
      top: 70px;
      
    }
  }

  #snackBar.show {
    visibility: visible;
    -webkit-animation: ${fadein} 0.5s, ${fadeout} 0.5s 2.5s;
    animation: ${fadein} 0.5s, ${fadeout} 0.5s 2.5s;
  }
  

  

`;





const Pokemon = ({pokemon, addNewItem}) => {
  const refSnackBar = useRef(null);



  let adicionarItem = () => {
    addNewItem(pokemon)
    if(refSnackBar.current){
      refSnackBar.current.className = "show";
      setTimeout(() => refSnackBar.current.className = "", 3000);
    }
  };

  return (
    <>
      <PokeCard>
        <PokeImg>
          <img alt = {pokemon.name} src={pokemon.sprite} />
        </PokeImg>
        <PokeInfo>
          <h5>{pokemon.name}</h5>
          <h6>R$ {formatMoney(pokemon.price)}</h6>
          <OutlineButton onClick={() => adicionarItem()}>
            Comprar <FontAwesomeIcon icon={faCartPlus}/>
          </OutlineButton>
        </PokeInfo>
        
      </PokeCard>  

      <SnackBarWrapper >
        <div id="snackBar" ref={refSnackBar}>
          {pokemon.name} adicionado ao Carrinho
        </div>
      </SnackBarWrapper>  
    </>
  );
}

Pokemon.propTypes = {
  pokemon: PropTypes.object.isRequired,
  addNewItem: PropTypes.func.isRequired,
};

export default Pokemon;