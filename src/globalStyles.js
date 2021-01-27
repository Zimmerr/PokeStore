import { createGlobalStyle } from 'styled-components';

 
const GlobalStyle = createGlobalStyle`
  html{
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    font-size: 10px;
    background: #f8f8f8;
  }
  *, *:before, *:after{
    box-sizing: inherit;
  }
  body{
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'Londrina Solid', cursive;
    font-weight: 300;
    letter-spacing: 2px;
  }
  a {
    text-decoration: none;
    color: #393939;
  }

::-webkit-scrollbar {
  width: 7px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
::-webkit-scrollbar-thumb {
  background: #888; 
}

::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
`;
 
export default GlobalStyle;