import {urlAPI} from "./../data/data";
import {saveData,readData} from "./../utilities/AsyncStorage";
import socket from "../utilities/Socket";

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
            saveData("user_id", String(json.id));
            socket.emit("new_user", {"user_id": json.id});
            saveData("username", String(json.username));
            saveData("user", JSON.stringify(json));
            return true;
        } else {
            return false;
        }
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

        var json = await res.json();

        
        if(json.id) {
            return false;
        } else {
            return json.message;
        }
    }

    
    getCurrentUser() {
        return readData("user");
    }

    getCurrentUserId() {
        let current_user = this.getCurrentUser();
        return current_user !== null ? current_user.id : readData('user_id');
    }

    getCurrentUsername() {
        let current_user = this.getCurrentUser();
        return current_user !== null ? String(current_user.username) : readData('user_id');
    }

    isAuthenticated() {
        return this.getCurrentUser() !== null;
    }
}

export default new AuthService()