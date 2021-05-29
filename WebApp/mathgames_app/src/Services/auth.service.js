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
            sessionStorage.setItem("user", JSON.stringify(json));
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

        var json = await res.json()
        
        if(json.id) {
            return { ok: true}
        }
        if(json.message === "Failed! Username is already in use!")
            return { ok: false, error: "username"}
        if(json.message === "Failed! Email is already in use!")
            return { ok: false, error: "email"}
        return { ok: false, error: json.message}
    }

    getCurrentUser() {
        return JSON.parse(sessionStorage.getItem("user"))
    }

    getCurrentUserId() {
        let current_user = this.getCurrentUser();
        return current_user !== null ? current_user.id : sessionStorage.getItem('user_id');
    }

    getCurrentUsername() {
        let current_user = this.getCurrentUser();
        return current_user !== null ? String(current_user.username) : sessionStorage.getItem('user_id');
    }

    isAuthenticated() {
        return this.getCurrentUser() !== null;
    }
}

export default new AuthService()