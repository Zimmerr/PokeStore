import React, { Component } from 'react'
import styled from 'styled-components'
import Pokemon from './Pokemon';
import ErrorPage from './ErrorPage'
import PropTypes from 'prop-types'
import ApiService from '../Services/pokemonAPI'
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter'
import formatNumber from '../utils/formatNumber'
import OutlineButton from './styled/OutlineButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt, faSearch } from '@fortawesome/free-solid-svg-icons'

const PokeContainer = styled.div`
  display: flex;
  grid-column: 1 / 2;
  flex-wrap: wrap;
  flex: 1 1 0px;
  justify-content: flex-start;
  align-items: center;
  padding: 2%;
  max-height: 93vh;
  overflow: auto;
  
  @media(max-width: 1000px){
    justify-content: space-around;
  }
`;

const ButtonContainer = styled.div`
  text-align: center;
  width: 100%;
  margin-top: 5vh;

  button{
    width: 50%;
  }
`;

const LoadingSpinner = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: none;
  font-size: 48px;
  color: white;
  z-index: 99;
  background: rgba(0, 0, 0, 0.7); 
  
  svg{
    color: ${props => props.theme.navColor};
    font-size: 10vh;
    margin: auto;
    margin-top: 41vh;
    display: block;
  }

  p{
    vertical-align: middle;
    text-align: center;
  }
`;

const SearchInput = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;
  width: 100%;
  height: 46px;
  transform: scale(1);
  transform-origin: 0 0;
  position: relative;
  padding-top: 13px;
  margin-bottom: 2vh;

  input{
    border: 0;
    border-bottom: 2px solid lightgrey;
    outline: none;
    transition: all .3s ease-out;
    border-radius:0;
    background: transparent;
    font-size: 16px;
    font-family: inherit;
    font-weight: inherit;
    letter-spacing: inherit;
  }

  input:focus{
    border-bottom: 2px solid ${props => props.theme.buttonColor};
  }

  .label-float input::placeholder{
    color:transparent;
  }

  label{
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 16px;
    transition: all .3s ease-out;
  }

  input:focus + label,
  input:not(:placeholder-shown) + label{
    font-size: 13px;
    margin-top: 0;
    color: ${props => props.theme.buttonColor};
  }
  

  button{
    border: none;
    cursor: pointer;
    font-weight: inherit;
    :hover{
      filter: brightness(0.9)
    }
  }

  @media(max-width: 1000px){
    font-size: 12px;
  }
`;

const paginationValue = 18;


class PokemonLista extends Component {
  constructor(props) {
    super(props);
    this.isLoading = React.createRef();
  }
  static propTypes = {
    pokemonType: PropTypes.string.isRequired,
    addNewItem: PropTypes.func.isRequired,
  };
  state = {
    urlList: [],
    pokemonList: [],
    searchInput: '',
    error: false,
  };

  componentDidMount(){
    this.loadingOn();
    ApiService.searchByType(this.props.pokemonType)
        .then(res => {
          this.setState({urlList: [...this.state.urlList, ...res.pokemon]})
          return this.state.urlList
        })
        .then(res => {
          this.updatePokemonList(res, paginationValue);
        })
        .catch(err => {
          this.handleError(err);
        });
  }

  loadingOff(){
    if(this.isLoading.current) this.isLoading.current.style.display = "none";
  }

  loadingOn(){
    if(this.isLoading.current) this.isLoading.current.style.display = "block";
  }

  handleError(err){
    this.loadingOff();
    console.log('Falha na comunicação com a API ao listar os Pokemons' + err)
    this.setState({error: true})
  }

  updatePokemonList(nameList, limit, offset = 0, newList){
    let pokeList = [];
    if(nameList.length === 0){
      this.setState({pokemonList: pokeList})
      return;
    }
    if(limit) {
      nameList = nameList.slice(offset, offset+limit)
      limit = Math.min(limit, nameList.length)
    }
    else limit = nameList.length
    this.loadingOn();
    nameList.forEach(o => {
      var id = o.pokemon.url.split('/')[6]
      ApiService.searchPokemonByID(id).then(data => {

        pokeList.push({
          name: capitalizeFirstLetter(data.name),
          sprite: data.sprites.front_default,
          price: formatNumber(data.id)
        })

        if(pokeList.length === limit){
          this.loadingOff();
          if(newList)
            this.setState({pokemonList: pokeList})
          else
            this.setState({pokemonList: [...this.state.pokemonList, ...pokeList]})
        } 
      })
      .catch(err =>{
        this.handleError(err);
      })
    })
  }

  searchPokemon(){
    let filteredList = this.state.urlList.filter(o => this.state.searchInput === '' || o.pokemon.name.includes(this.state.searchInput))
    let limit = filteredList.length === this.state.urlList.length ? paginationValue : filteredList.length;
    let searchMode = this.state.searchInput !== '';
    this.updatePokemonList(filteredList, limit, 0, true)
    this.setState({searchMode})
  }

  onChangeHandler(e){
    this.setState({
      searchInput: e.target.value,
    })
  }


  render(){
    const {urlList, pokemonList, searchMode, error} = this.state;
    const {addNewItem} = this.props;
    if(!error)
      return (
        <>
          
          <PokeContainer>
            <SearchInput>
              
              <input value={this.state.searchInput} type="text" placeholder=" " onChange={(e) => this.onChangeHandler(e)}/>
              <label>Busque aqui um pokemon!</label>
              <button onClick={() => this.searchPokemon()} type="submit">
              <FontAwesomeIcon icon={faSearch}/>
              </button>
            </SearchInput>
            {pokemonList
              .map((pokemon, index) => {
                if(pokemon.sprite) 
                  return (
                    <Pokemon key={index} pokemon={pokemon} addNewItem={addNewItem}/>
                  )
            })}
            <ButtonContainer>
              {
                searchMode || urlList.length === pokemonList.length  ?
                  null
                  :
                  <OutlineButton onClick={() => this.updatePokemonList(this.state.urlList, paginationValue, pokemonList.length)}>
                    Mostrar Mais
                  </OutlineButton>
              }
            </ButtonContainer>
          </PokeContainer>
          <LoadingSpinner ref={this.isLoading}> 
            <FontAwesomeIcon icon={faSyncAlt} spin/>
          </LoadingSpinner>
        </>
      )
    else return <ErrorPage/>
  }
}


export default PokemonLista;