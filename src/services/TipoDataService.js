import http from '../http-commons';

class TipoDataService{
    async buscarTodos(){
    let resposta = await http.get('/tipos');
    return resposta.data;
     }

     async buscarPeloId(id){
        let resposta = await http.get('/tipos/${id}');
        return resposta.data;
     }
     async criar(pokemon){
        let resposta = await http.post('/tipos', pokemon);
        return resposta.data;
     }

     async atualizar(id, pokemon){
        let resposta = await http.put('/tipos/${id}', pokemon);
        return resposta.data;
     }

     async remover(id){
        await http.delete('/tipos/${id}');
     }

     async removerPeloNome(nome){
        await http.delete('/tipos?termo=${nome}');
     }
     

     async buscarPeloNome(nome){
        await http.get('/tipos?termo=${nome}');
        return resposta.data;
     }

     

}

export default new TipoDataService();