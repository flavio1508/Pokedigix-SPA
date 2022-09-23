<script>
import AtaqueDataService from '../services/AtaqueDataService ';
import AtaqueRequest from '../models/AtaqueRequest';
import TipoDataService from '../services/TipoDataService';
export default {
    name: 'ataques-novo',
    data() {
        return {

            ataqueRequest: new AtaqueRequest(),
            salvo: false,
            categorias:[
                {
                    indice: 1,
                    nome: "Fisico",
                    nomeBanco: "Fisico"
                },
                {
                    indice: 2,
                    nome: "Especial",
                    nomeBanco: "Especial"
                },
                {
                    indice: 3,
                    nome: "Efeito",
                    nomeBanco: "Efeito"

                }
            ],
            tipos: []

        }
    },
    methods: {
        carregarTipos(){
             TipoDataService.buscarTodos()
             .then(resposta => {
                this.tipos = resposta;
                this.ataqueRequest.tipoId = this.tipos[0].id;
             })
             .catch(erro => {
                console.log(erro);
             });

        },
        novo() {
            this.ataqueRequest = new AtaqueRequest();
            this.salvo = false;
        }
        

    },
    mounted(){
        this.ataqueRequest.categoria = this.categorias[1].nomeBanco;
        this.carregarTipos();
    },

}
</script>

<template>
    <div v-if="!salvo">
        <form class=" row g-3">
            <div class="col-12"> 

                <label for="nome" 
                class="form-label">Nome do Ataque</label>
                <input type="text" 
                required class="form-control" v-model="ataqueRequest.nome" id="nome">
                
            </div>
                <div class="col-6">
                    <label for="foca" 
                    class="forca-label">Força</label>
                    <input type="text" 
                    required class="form-control" v-model="ataqueRequest.nome" id="forca">
                </div>
                <div class="col">
                    <label for="acuracia" 
                    class="form-label">Acurácia</label>
                    <input type="text" 
                    required class="form-control" 
                    v-model="ataqueRequest.nome" id="acuracia">
                </div>
            <div class="col -3">
                <label for="pp" 
                    class="form-label">PP</label>
                    <input type="number" 
                    required class="form-control" 
                    v-model="ataqueRequest.nome" id="pp">
            </div>
            <div class="col-9">
              <label for="categoria" class=" form-label">State</label>
              <select id="categoria" class="form-select" v-model="ataqueRequest.categoria">
                <option v-for="categoria in categorias" :key="categoria.indice"
                :value="categoria.nomeBanco">
                    {{categoria.nome}}
                </option>
              </select>
            <div class="col-12">
              <label for="tipo" class=" form-label">Tipo do Ataque</label>
              <select id="tipo" class="form-select" v-model="ataqueRequest.tipoId">
                <option v-for="tipo in tipos" :key="tipo.id"
                :value="tipo.id">
                    {{tipo.nome}}
                </option>
              </select>
            </div>
            </div>
            categoria: {{ataqueRequest.categoria}}
            <button @click.prevent="salvar" class="btn btn-success">Salvar</button>
        </form>
    </div>

    <div v-else>
        <h4>Salvo com sucesso!</h4>
        <span>Tipo id: {{tipo.id}}</span>
        <div class="row-sm">
            <button @click="novo" class="btn btn-primary">Novo</button>
        </div>
    </div>

</template>