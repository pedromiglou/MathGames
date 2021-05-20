class AuthService {
    constructor() {
        this.apiURL = process.env.NODE_ENV === "development" ? 'http://localhost:4000/api/' : 'http://138.68.191.32:4000/api/';
    }

    async login(username, password) {
            
        let userInfo= {
            username: username,
            password: password,
        }

        var res = await fetch(this.apiURL + 'users/login', {
            method:'POST',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify(userInfo)
        })

        var json = await res.json()
        
        if(json.id) {
            localStorage.setItem("user", JSON.stringify(json));
            console.log("vou return")
            return true
        } else {
            return false
        }

    }


    async register(username, email, password) {
        let userInfo= {
            username: username,
            email: email,
            password: password,
        }
        

        var res = await fetch(this.apiURL + 'users/register', {
            method:'POST',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify(userInfo)
        })
        console.log(res)
        var json = await res.json()
        
        console.log(json)
        if(json.id) {
            return true
        }
        return false
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"))
    }
}

export default new AuthService()