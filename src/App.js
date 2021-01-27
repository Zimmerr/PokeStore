import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import styled from 'styled-components'
import Home from './Components/Home'
import LojaFogo from './Components/LojaFogo'
import LojaAgua from './Components/LojaAgua'
import {ThemeProvider } from 'styled-components';
import usePokeTheme from './Components/usePokeTheme'

const NavStyled = styled.ul`
  background-color: ${props => props.theme.navBackground};
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 2rem;
  height: 7vh;
  min-height: 50px;
  li{
    list-style:none;
  }
  
  a{
    color: ${props => props.theme.navText};
    height: 100%;
    padding: 1rem 3rem;
    display: flex;
    align-items: center;
    position: relative;
    font-size: 1em;
    background: none;
    border: 0;
    text-transform: uppercase;
    
    cursor: pointer;
    @media (max-width: 1000px) {
      padding: 0 10px;
    }
    @media (max-height: 900px){
      font-size: 0.8em;
    }
  }

  li:not(:first-child){
    a:after {
      height: 4px;
      background: ${props => props.theme.navText};
      content: '';
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      bottom: 0px;
      //margin-top: 3rem;
    }
    a:hover{
      outline: none;
      :after {
        width: 100%;
      }
      
    }
  }
  

  li:nth-of-type(1){
    
    font-size: 1.2em;
    float:left;
    text-transform: uppercase;

    p{
      border-top: 0.2em solid ${props => props.theme.navText};
      border-bottom: 0.2em solid ${props => props.theme.navText};
      padding: 0;
      margin: 15px;
      font-weight: 400;
    }
    @media (max-width: 1000px) {
      p{
        margin: 5px;
      }
    }
  }

  @media (max-width: 1000px) {
    border-top: 1px solid ${props => props.theme.lightgrey};
    width: 100%;
    justify-content: center;    
  }
`;

const HomeImage = styled.img`
  content:url(${props => props.theme.navImage});
  height: 4vh;
`;


const App = () => {

  const [theme, setMode] = usePokeTheme();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <nav>
            <NavStyled>
              <li> 
                <Link onClick={(e) => setMode("defaultTheme", e)} to="/">
                  <HomeImage/>
                  <p>POKESTORE</p>
                </Link>
              </li>
              <li>
                <Link onClick={(e) => setMode("waterTheme", e)} to="/agua">Água</Link>
              </li>
              <li>
                <Link onClick={(e) => setMode("fireTheme", e)} to="/fogo">Fogo</Link>
              </li>
            </NavStyled>
          </nav>

          <Switch>
            <Route path='/' exact={true} component={() => <Home setMode={setMode}/>}/>
            <Route path='/agua' component={LojaAgua}/>
            <Route path='/fogo' component={LojaFogo}/>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App;
