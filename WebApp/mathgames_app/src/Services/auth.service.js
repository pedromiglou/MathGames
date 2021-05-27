
class AuthService {
    async login(username, password) {

        let userInfo= {
            username: username,
            password: password,
        }

        var res = await fetch('http://localhost:4000/api/users/login', {
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
        

        var res = await fetch('http://localhost:4000/api/users/register', {
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