<script>
import AtaqueDataService from "../services/AtaqueDataService";
import Loading from "vue-loading-overlay";
import Ordenacao from '../components/Ordenacao.vue';
import Paginacao from '../components/Paginacao.vue';
import Pesquisa from '../components/Pesquisa.vue';
export default {
  name: "ataques-lista",
  data() {
    return {
      ataques: [],
      pagina: 1,
      tamanho: 2,
      ataqueSelecionado: this.inicializaAtaque(),
      isLoading: false,
      fullPage: false,
      ordenacao: {
        titulo: "",
        direcao: "",
        campo: ""
      },
      totalPaginas: 4,
      quantidade: 3,
      opcoes: [{
        titulo: "Nome: Crescente",
        direcao: "ASC",
        campo: "nome"
      },
      {
        titulo: "Nome: Decrescente",
        direcao: "DESC",
        campo: "nome"
      },
      {
        titulo: "Numero: Crescente",
        direcao: "ASC",
        campo: "numeroPokedex"
      },
      {
        titulo: "Nivel: Decrescente",
        direcao: "DESC",
        campo: "nivel"
      }],
      termo: ""
    };
  },
  components: {
    Loading,
    Ordenacao,
    Paginacao,
    Pesquisa

  },
  methods: {
    filtarPeloDigitada() {
      if (this.termo.length > 3) {
        this.buscarAtaques();
      }
    },
    trocarPagina(p) {
      this.pagina = p;
      this.buscarAtaques();
    },
    buscarAtaques() {
      this.isLoading = true;
      AtaqueDataService.buscarTodosPaginadoOrdenado(this.pagina - 1, this.tamanho, this.ordenacao.campo, this.ordenacao.direcao, this.termo)
        .then((resposta) => {
          this.ataques = resposta.ataques;
          this.totalPaginas = resposta.totalPaginas
          this.isLoading = false;
        })
        .catch((erro) => {
          console.log(erro);
          this.isLoading = false;
        });
    },
    editar(id) {
      this.$router.push({ name: "ataques-edit", params: { id: id } });
    },
    selecionar(ataque) {
      this.ataqueSelecionado.id = ataque.id;
      this.ataqueSelecionado.nome = ataque.nome;
    },
    inicializaAtaque() {
      return {
        id: null,
        nome: null
      }
    },
    removerAtaqueSelecionado() {
      this.isLoading = true;
      AtaqueDataService.remover(this.ataqueSelecionado.id)
        .then(() => {
          this.ataques = this.ataques.filter(ataque => ataque.id != this.ataqueSelecionado.id);
          this.inicializaAtaque();
          this.isLoading = false;
        })
        .catch(() => {
          this.inicializaAtaque();
          this.isLoading = false;
        });
    }
  },
  mounted() {
    this.buscarAtaques();
    this.ordenacao = this.opcoes[0]
  },
};
</script>
            
<template>
  <main> 
  <div class="row">
    <h2 class="mb-4 mt-4">Lista de Ataques</h2>
    <div class="row justify-content-end">
        <div class="col-2">
          <Ordenacao v-model="ordenacao" @ordenar="buscarPokemons" 
            :ordenacao="ordenacao" :opcoes="opcoes" />
        </div>
        <div class="col-4">
          <Pesquisa :texto="termo" :pesquisar="pesquisar" />
        </div>
      </div>
    <div class="table-responsive">
      <loading v-model:active="isLoading" :is-full-page="fullPage" loader="spinner" />
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Nome do Ataque</th>
            <th scope="col">Tipo</th>
            <th scope="col">Categoria</th>
            <th scope="col">For??a</th>
            <th scope="col">Acur??cia</th>
            <th scope="col">Pontos de Poder</th>
            <th scope="col" colspan="2"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ataque in ataques" :key="ataque.id">
            <td>{{ ataque.nome }}</td>
            <td>{{ ataque.tipo.nome }}</td>
            <td>{{ ataque.categoria }}</td>
            <td>{{ ataque.forca }}</td>
            <td>{{ ataque.acuracia }}</td>
            <td>{{ ataque.pontosDePoder }}</td>
            <td>
              <button type="button" class="btn" @click="editar(ataque.id)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path
                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                </svg>
              </button>
            </td>
            <td>
              <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#confirmacaoExclusao"
                @click="selecionar(ataque)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3"
                  viewBox="0 0 16 16">
                  <path
                    d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="modal fade" id="confirmacaoExclusao" tabindex="-1" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Confirmacao de exclusao</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Ao confirmar, o ataque "<strong>{{ataqueSelecionado.nome}}</strong>" sera excluido.
            Deseja continuar?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>
            <button type="button" class="btn btn-primary" @click="removerAtaqueSelecionado"
              data-bs-dismiss="modal">Sim</button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-1">
          <button @click="novo" class="btn btn-primary">Novo</button>
        </div>
      </div>
    </div>
  </div>
  <Paginacao :totalPaginas="totalPaginas" :quantidadeItens="quantidade" :atual="pagina" :trocarPagina="trocarPagina">
  </Paginacao>
</main>
</template>