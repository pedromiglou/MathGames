import {urlAPI} from "./../data/data";

class AuthService {
    async login(username, password) {
            
        let userInfo= {
            username: username,
            password: password,
        }

        var res = await fetch(urlAPI + 'api/users/login', {
            method:'POST',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify(userInfo)
        })

        var json = await res.json()
        
        if(json.id) {
            localStorage.setItem("user", JSON.stringify(json));
        } 
        return json

    }


    async register(username, email, password) {
        let userInfo= {
            username: username,
            email: email,
            password: password,
        }
        

        var res = await fetch(urlAPI + 'api/users/register', {
            method:'POST',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify(userInfo)
        })
        console.log(res)
        var json = await res.json()
        
        console.log(json)
        if(json.id) {
            return { ok: true}
        }
        if(json.message === "Failed! Username is already in use!")
            return { ok: false, error: "username"}
        if(json.message === "Failed! Email is already in use!")
            return { ok: false, error: "email"}
        return { ok: false, error: "error"}
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"))
    }
}

export default new AuthService()