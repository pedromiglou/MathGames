import {urlAPI} from "./../data/data";
import {saveData,readData} from "./../utilities/AsyncStorage";
import { Alert } from 'react-native';

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
            saveData("user_id", String(json.username));
            saveData("user", JSON.stringify(json));
            return json;
        } else {
            Alert.alert("Falha no Login");
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

        console.log(json);
        
        if(json.id) {
            return json;
        }
        if(json.message === "Failed! Username is already in use!")
            Alert.alert("O Username já existe");
        if(json.message === "Failed! Email is already in use!")
            Alert.alert("O Email já existe");
        if(json.message === "Password invalid")
            Alert.alert("Palavra-passe demasiado fraca.")
        Alert.alert("Ocorreu um problema no registo")
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