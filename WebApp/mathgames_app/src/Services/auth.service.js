const API_URL = "http://localhost:4000/"


class AuthService {
    login(username, password) {

        let userInfo= {
            username: username,
            password: password,
        }
        
        fetch('http://localhost:4000/login', {
            method:'POST',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify(userInfo)
        }).then(r=>r.json()).then(res=> {
            if(res.token) {
                localStorage.setItem("user", JSON.stringify(res))
            }
            return res
        })
    }


    register(username, email, password) {
        let userInfo= {
            username: username,
            email: email,
            password: password,
        }
        
        fetch('http://localhost:4000/register', {
            method:'POST',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify(userInfo)
        }).then(r=>r.json()).then(res=> {
            if(res) {
                console.log('New User was created')
            }
            return res
        })
    }

    getCurrentUser() {
        console.log(JSON.parse(localStorage.getItem("user")))
        console.log("vou return")
        return JSON.parse(localStorage.getItem("user"))
    }
}

export default new AuthService()