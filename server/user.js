class User{    
    constructor(id, name, email, hash) {
        if(id)
            this.id = id;

        this.name = name;
        this.email = email;
        this.hash = hash;
    }
}

module.exports = User;
