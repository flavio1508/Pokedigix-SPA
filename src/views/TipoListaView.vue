<script >
import TipoDataService from '../services/TipoDataService';
export default {
  name: "tipos-lista",
  data() {
    return { tipo: [] };
  },
  methods: {
    salvar() {
      TipoDataService.criar(this.tipo)
        .then(resposta => {
          this.tipo.id = resposta.id;
          console.log(this.tipo);
          this.salvo = true;
        })
        .catch(erro => {
          console.log(erro);
          this.salvo = false;
        })
    },
    buscarTipos() {
      TipoDataService.buscarTodos()
        .then(resposta => {
          this.tipo = resposta
        })
        .catch(erro => {
          console.log(erro);
        });
    },
    remover(id) {
      console.log(typeof (id));
      TipoDataService.remover(parseInt((id)))
        .then(() => {
          this.buscarTipos();
        })

    },
  },
  mounted() {
    this.buscarTipos();
  }
}

</script>
<template>
  <main>
    <div class="row row-cols-1 row-cols-md-5 g-3">
      <div class="col" v-for="tipo in tipo" :key="tipo.id">
        <ul>
          <li class="list-group-item  text-bg-light space-between">
            Id: {{tipo.id}} - {{tipo.nome}}
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>
    