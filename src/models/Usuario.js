export default class Usuario {
    constructor() {
        this.id = null;
        this.username = null;
        this.email = null;
        this.password = null;
        this.role = ['treinador'];
    }

    populate(obj) {
        this.id = obj.id;
        this.username = obj.username;
        this.email = obj.email;
        this.password = obj.password;
        this.role = obj.role;
    }

    toJson() {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            password: this.password,
            role: this.role
        }
    }
}
