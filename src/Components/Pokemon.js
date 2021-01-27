import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import OutlineButton from './styled/OutlineButton'

const PokeCard = styled.div `
  background: white;
  margin: 1%;
  border: 1px solid #EDEDED;
  line-height: 1;
  flex-basis: 14.5%;
  -webkit-box-shadow: 0px 0px 5px 0px #EDEDED; 
  box-shadow: 0px 0px 5px 0px #EDEDED;

  @media(max-width: 1000px){
    flex-basis: auto;
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
  }
  h6{
    font-size: 1.4rem;
    font-weight: inherit;
  }
  button{
    width: 100%;
  }
`



const Pokemon = ({pokemon, addNewItem}) => {

  let adicionarItem = () => {
    addNewItem(pokemon)
  };

  return (
    <PokeCard>
      <PokeImg>
        <img alt = {pokemon.name} src={pokemon.sprite} />
      </PokeImg>
      <PokeInfo>
        <h5>{pokemon.name}</h5>
        <h6>R$ {pokemon.price.toFixed(2)}</h6>
        <OutlineButton onClick={() => adicionarItem()}>
          Comprar <FontAwesomeIcon icon={faCartPlus}/>
        </OutlineButton>
      </PokeInfo>
    </PokeCard>
  );
}

Pokemon.propTypes = {
  pokemon: PropTypes.object.isRequired,
  addNewItem: PropTypes.func.isRequired,
};

export default Pokemon;