import React, { useEffect } from 'react';
import {
  useHistory
} from "react-router-dom";
import styled from 'styled-components'
import * as waterSymbolURL from '../assets/waterSymbol.png'
import * as fireSymbolURL from '../assets/fireSymbol.png'
import * as blastoiseURL from '../assets/blastoise.png'
import * as charizardURL from '../assets/charizard.png'

const PanelWrapper = styled.div`
  height: 93vh;
  width: 100%;
  :hover > div:not(:hover) {
    filter: brightness(0.5);
    transition: all .3s ease-in;
  }
`;
const StorePanel = styled.div`
  cursor: pointer;
  display: inline-block;
  height: 100%;
  text-align: center;
  vertical-align: top;
  width: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
              
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${props => props.imgURL});

  background-size:     cover;                      
  background-repeat:   no-repeat;
  background-position: center center;  

  :hover {
    div{
      transition: all .3s ease-in-out;
      transform: scale(1.2);
    }
  }

  img {
    height: 20vh;
    width: 20vh;
  }

  h3{
    color: white;
    font-size: 8rem;
    margin: auto;
    -webkit-text-stroke: 2px black;
  }


  @media(max-width:1000px){
    height: 50%;
    width: 100%;
    
    img {
      height: 20vh;
      width: 20vh;
    }
  
    h3{
      color: white;
      font-size: 4rem;
      margin-top: auto;
    }
  }

`;

const Home = ({setMode}) => {
  
  const history = useHistory();

  useEffect(() => {
    setMode("defaultTheme");
  })

  let changeStore = (route, theme) => {
    history.push(route)
    setMode(theme);
  }

  return (

      <PanelWrapper>
        <StorePanel onClick={() => changeStore('agua', 'waterTheme')} imgURL={blastoiseURL.default} className="waterPanel">
          <div >
            <img src={waterSymbolURL.default} alt="Simbolo do Pokemon tipo Agua"/>
            <h3>Água</h3>
          </div>
        </StorePanel>
        <StorePanel onClick={() => changeStore('fogo', 'fireTheme')} imgURL={charizardURL.default} className="firePanel">
          <div>
            <img src={fireSymbolURL.default} alt="Simbolo do Pokemon tipo Fogo"/>
            <h3>Fogo</h3>
          </div>
        </StorePanel>
      </PanelWrapper>

  );

}

export default Home;