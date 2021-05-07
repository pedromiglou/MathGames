
class AuthService {
    async login(username, password) {

        let userInfo= {
            username: username,
            password: password,
        }
        /*
        fetch('http://localhost:4000/api/users/login', {
            method:'POST',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify(userInfo)
        }).then(r=>r.json()).then(res=> {
            console.log(res)
            if(res.id) {
                localStorage.setItem("user", JSON.stringify(res));
                console.log("vou return")
                return true
                //window.location.assign("http://localhost:3000/");
            } else {
                return false
                //window.location.reload();
            }
        })*/

        var res = (await fetch('http://localhost:4000/api/users/login', {
            method:'POST',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify(userInfo)
        }))

        var json = await res.json()
        
        if(json.id) {
            localStorage.setItem("user", JSON.stringify(json));
            console.log("vou return")
            return true
            //window.location.assign("http://localhost:3000/");
        } else {
            return false
            //window.location.reload();
        }

    }


    register(username, email, password) {
        let userInfo= {
            username: username,
            email: email,
            password: password,
        }
        
        fetch('http://localhost:4000/api/users/register', {
            method:'POST',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify(userInfo)
        }).then(r=>r.json()).then(res=> {
            if(res) {
                console.log('New User was created')
                return true
            }
            return false
            //window.location.reload();        

        })
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"))
    }
}

export default new AuthService()