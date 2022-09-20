<script >
import PokemonDataService from '../services/PokemonDataService';
export default {
  name:"lista-pokemons",
  data(){
    return {pokemons : []};
  },
   methods: {
    buscarPokemons(){
    PokemonDataService.buscarTodos()
    .then(resposta => {
      this.pokemons = resposta
    })
    .catch(erro => {
      console.log(erro);
    });
}
},
mounted(){
  this.buscarPokemons();
}
}
</script>
<template>
    <div>
    <h2>Lista De Pokemon</h2>
    <ul>
      <li v-for="pokemon in pokemons" :key="pokemon.id">
        <img :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/' + pokemon.numeroPokedex + '.png'" />
        {{pokemon.numeroPokedex}} - {{pokemon.nome}}
      </li>
    </ul>

    <div class="row row-cols-1 row-cols-md-2 g-4">
  <div class="col">
    <div class="card">
      <img src="Capitão.png" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Capitão America</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card">
      <img src="thor.png" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Thor</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card">
      <img src="homem-ferro.png" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Homem de Ferro</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card">
      <img src="huk.jpg" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Huk</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
</div>

  </div>

</template>
