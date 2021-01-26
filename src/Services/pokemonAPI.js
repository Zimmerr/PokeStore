const urlBase = 'https://pokeapi.co/api/v2';

const consomeApi = (parametro = '', method = 'GET', body) => {
    
    return fetch(`${urlBase}/${parametro}`, {
        method,
        headers: {'content-type': 'application/json'},
        body,
    })
      .then(res => ApiService.TrataErros(res))
      .then(res => res.json());
}

const ApiService = {
  searchByType: (type) => {
    let paramType = 'type/' + type;
    return consomeApi(paramType)
  },

  searchPokemonByID: (id) => {
    let paramType = 'pokemon/' + id;
    return consomeApi(paramType)
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

    console.log(pokeList)

    //return pokeList;
  },


  // ListaAutores: () => consomeApi(),

  // CriaAutor: autor => consomeApi('', 'POST', autor),

  // ListaNomes: () => consomeApi('nome'),
  // ListaLivros: () => consomeApi(),
  // RemoveAutor: id => consomeApi(id, 'DELETE'),
  TrataErros: res =>{
    if(!res.ok){
        throw Error(res.responseText);
    }
    return res;
  }

}
export default ApiService;