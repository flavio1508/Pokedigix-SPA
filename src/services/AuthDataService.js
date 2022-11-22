import http from "../http-commons";

class AuthDataService {
    async signup(usuario) {
    let resposta = await http.post('/auth/signup', usuario );
        return resposta;
    }

}

export default new AuthDataService();