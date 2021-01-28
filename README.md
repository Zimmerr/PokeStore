# Description

PokeStore is a React Application that uses data from  https://pokeapi.co to simulate a pokemon e-commerce.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to Run

```
git clone https://github.com/Zimmerr/PokeStore
cd PokeStore
npm install
npm start
```

## How to Use

At the time of commiting this, the project can be accessed at https://pokestore-react.web.app


## Notes
  + App is hosted on firebase hosting
  + Both Fire and water stores are contained in the app and can be navigated between them (through home, nav, or url)
  + Tried to use as few libs as possible to pratice vanilla JS and CSS skills
    + React-router-dom for routing
    + prop-types to validate props passed between components
    + axios to make fast requests to the API
    + Styled Components to style the application with CSS and to handle the themes
    + Font Awesome because their icons are awesome
  + Theme changes dynamically as you navigate into different pokemon type stores. I started with 2 types only but the way its built, its ready to have more stores without much effort
  + Prices are based on the ID returned by the API (which is mostly based on pokedex except for alternative pokemons like mega versions)
