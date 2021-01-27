import axios from 'axios';

const urlBase = 'https://pokeapi.co/api/v2';

const getApi = (parametro = '') => {
    return axios.get(`${urlBase}/${parametro}`, {
        headers: {'content-type': 'application/json'},
    })
      .then(res => ApiService.TrataErros(res))
      .then(res => res.data);
}

const ApiService = {
  searchByType: (type) => {
    let paramType = 'type/' + type;
    return getApi(paramType)
  },

  searchPokemonByID: (id) => {
    let paramType = 'pokemon/' + id;
    return getApi(paramType)
  },

  searchPokemonList: (array) => {
    let pokeList = [];
    array.forEach(o =>{
      // url.split('/') = ["https:", "", "pokeapi.co", "api", "v2", "pokemon", "61", ""]
      var id = o.pokemon.url.split('/')[6]
      this.searchPokemonByID(id).then(data => {
        pokeList.push({
          name: data.name,
          sprite: data.sprites.front_default,
          price: Math.random() * 100
        })
      })
    })
  },


  TrataErros: res =>{
    if(!res.status === 200){
        throw Error(res.responseText);
    }
    return res;
  }

}
export default ApiService;