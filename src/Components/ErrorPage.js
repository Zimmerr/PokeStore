import React from 'react'
import * as faintURL from '../assets/error.png'
import styled from 'styled-components'

const ErrorDiv = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: center;
  justify-content: center;
  img{
    max-width: 50%;
    max-height: 30%;
  }
`;

const ErrorPage = () => {
  return (
    <ErrorDiv>
      <img src={faintURL.default} alt="Imagem de um pikachu debilitado"/>
      <h3>Ocorreu um Erro :(</h3>
      <h5>Infelizmente ocorreu um erro no carregamento da página. Estamos trabalhando pra resolver o mais rápido possível!</h5>
    </ErrorDiv>
  )
}

export default ErrorPage;