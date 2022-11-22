import { createRouter, createWebHistory } from 'vue-router';
const  PokemonListaView = () => import ('../views/PokemonListaView.vue');
const  TipoNovoView = () => import ('../views/TipoNovoView.vue');
const PokemonNovoView = () => import ('../views/PokemonNovoView.vue');
const TipoListaView = () => import ('../views/TipoListaView.vue');
const  AtaqueNovoView = () => import ('../views/AtaqueNovoView.vue');
const  AtaqueListaView = () => import ('../views/AtaqueListaView.vue');
const TreinadorListaView = () => import ('../views/TreinadorListaView.vue');
const PageNotFoundView = () => import ('../views/PageNotFoundView.vue');
const  AtaqueEditView = () => import ('../views/AtaqueEditView.vue');
const  TipoEditView = () => import ('../views/TipoEditView.vue');
const  TreinadorNovoView = () => import ('../views/TreinadorNovoView.vue');
const CadastroView = () => import ('../views/CadastroView.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PokemonListaView
    },
    {
      path: '/:catchAll(.*)*',
      name: 'not-found',
      component: PageNotFoundView,
    },
    {
      path: '/pokemons/lista',
      name: 'pokemons-lista',
      component: PokemonListaView
    },
    
    {
      path: '/tipos/novo',
      name: 'tipos-novo',
      component: TipoNovoView
    },
    {
      path: '/tipos/edit/:id',
      name: 'tipos-edit',
      component: TipoEditView
    },
    {
      path: '/ataques/edit/:id',
      name: 'ataques-edit',
      component: AtaqueEditView
    },
    {
      path: '/ataques/novo',
      name: 'ataques-novo',
      component: AtaqueNovoView
    },
    {
      path: '/tipos/lista',
      name: 'tipos-lista',
      component: TipoListaView
    },{
      path: '/ataques/lista',
      name: 'ataques-lista',
      component: AtaqueListaView
    },
    {
      path:'/pokemons/novo',
      name:'pokemons-novo',
      component: PokemonNovoView
    },
    {
      path:'/treinadores/lista',
      name:'treinadores-lista',
      component: TreinadorListaView
    },
    {
      path:'/treinadores/novo',
      name:'treinadores-novo',
      component: TreinadorNovoView
    },
    {
      path:'/usuarios/novo',
      name:'usuarios-novo',
      component: CadastroView
    },
    
  ]
})

export default router
