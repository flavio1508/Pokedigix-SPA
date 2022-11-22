<script>
import AuthDataService from '../services/AuthDataService';
import Usuario from '../models/Usuario';
import MensagemSucessoVue from '../components/MensagemSucesso.vue'
export default {
    name: 'usuarios-novo',
    data() {
        return {
            usuario: new Usuario(),
            salvo: false
        }
    },
    components: {
        MensagemSucessoVue
    },
    methods: {
        salvar() {
            AuthDataService.signup(this.usuario)
                .then(resposta => {
                    console.log(resposta);
                    this.salvo = true;
                    this.novo();
                })
                .catch(erro => {
                    console.log(erro);
                    this.salvo = false;
                })
        },

        novo() {
            this.usuario = new Usuario();
            this.salvo = false;
        }
    }
}
</script>

<template>
    <div class="row">
        <div class="col-md-5 mx-auto">
            <form class="justify-content-center">
                <div class="form-group">
                    <label for="nome" class="form-label">Nome do Usuario</label>
                    <input type="text" required class="form-control" v-model="usuario.username" id="nome">
                </div>
                <div class="form-group">
                    <label for="nome" class="form-label">E-mail</label>
                    <input type="text" required class="form-control" v-model="usuario.email" id="nome">
                </div>
                <div class="form-group">
                    <label for="nome" class="form-label">Senha</label>
                    <input type="password" required class="form-control" v-model="usuario.password" id="nome">
                </div>
                <button @click.prevent="salvar" class="mt-2 btn btn-success">Salvar</button>
            </form>
        </div>
    </div>
</template>