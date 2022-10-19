<template>
    <div class="container">
        <img src="../../public/download.png" class="img-fluid w-50" alt="imagem de um pikachu" title="pikachu">
        <p class="text">Voltar para a <RouterLink to="/">pagina incial</RouterLink> </p>
    </div>
</template>
<script setup>
import {RouterLink} from 'vue-router';
</script>
<style>
.container{
}
</style>