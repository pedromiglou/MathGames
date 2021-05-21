class UserService {
    constructor() {
        this.apiURL = process.env.NODE_ENV === "development" ? 'http://localhost:4000/api/' : 'http://138.68.191.32:4000/api/';
    }
    
    async getUserById(userId) {
        var url = this.apiURL + 'users/' + userId;
        var res = await fetch(url);
        return res.json();
    }

    async getFriends(userId) {
        var url = this.apiURL + 'friends/' + userId;
        console.log(JSON.parse(localStorage.getItem("user"))["token"]);
        var res = await fetch(url, {headers: {'x-access-token': JSON.parse(localStorage.getItem("user"))["token"]}});
        if (res.status !== 200) 
            return { error: true };
        return res.json();
    }

    async getNotifications(userId) {
        var url = this.apiURL + 'notifications/' + userId;
        var res = await fetch(url, {headers: {'x-access-token': JSON.parse(localStorage.getItem("user"))["token"]}});
        return res.json();
    }

    async getLastGames(userId) {
        var url = this.apiURL + 'matches?userid=' + userId;
        var res = await fetch(url, {headers: {'x-access-token': JSON.parse(localStorage.getItem("user"))["token"]}});
        if (res.status !== 200) {
            return {'error': true}
        }
        return res.json();
    }
    
    async getUsers(username, page, pageSize) {
        var url = this.apiURL + 'users?orderby=account_level&page=' + page + '&size=' + pageSize + '&username=' + username;
        var res = await fetch(url);
        return res.json();
    }

    //Save avatar function
    async update_user(color, hat, shirt, accessorie, trouser, user) {
        let avatar = {
            avatar_color: color,
            avatar_hat: hat,
            avatar_shirt: shirt,
            avatar_accessorie: accessorie,
            avatar_trouser: trouser,
        }

        var url = 'http://localhost:4000/api/users/' + user;
        
        await fetch(url, {
            method:'PUT',
            headers:{'Content-type':'application/json',
                     'x-access-token': JSON.parse(localStorage.getItem("user"))["token"]},
            body: JSON.stringify(avatar)
        });

        return;        
    }

    delete(notificationId) {
        var url = this.apiURL + 'notifications/' + notificationId;
        fetch(url, {
            method:'DELETE',
            headers: {'x-access-token': JSON.parse(localStorage.getItem("user"))["token"]}
        });
        return;
    }

    accept_friendship(notification) {
        let friends= {
            friend1: notification.sender_user.sender_id,
            friend2: notification.receiver,
        }

        var url = this.apiURL + 'friends/';
        fetch(url, {
            method:'POST',
            headers:{'Content-type':'application/json',
                     'x-access-token': JSON.parse(localStorage.getItem("user"))["token"]},
            body: JSON.stringify(friends)
        });

        return;
    }

    make_friend_request(friend1, friend2) {
        let friends= {
            sender: friend1,
            receiver: friend2,
            notification_type: "F"
        }

        var url = this.apiUrl + 'notifications/';
        
        fetch(url, {
            method:'POST',
            headers:{'Content-type':'application/json',
                     'x-access-token': JSON.parse(localStorage.getItem("user"))["token"]},
            body: JSON.stringify(friends)
        });

        return;        
    }


    remove_friend(friend1, friend2) {
        var url = 'http://localhost:4000/api/friends/' + friend1 + "/" + friend2;
        
        fetch(url, {
            method:'DELETE',
            headers:{'Content-type':'application/json',
                     'x-access-token': JSON.parse(localStorage.getItem("user"))["token"]},
        });

        return;    
    }
    
    report_player(friend1, friend2) {
        // TODO    
    }

    ban_player(player) {
        let ban= {
            reason: "New Ban",
            user_id: player
        }

        var url = 'http://localhost:4000/api/bans/';
        
        fetch(url, {
            method:'POST',
            headers:{'Content-type':'application/json',
                     'x-access-token': JSON.parse(localStorage.getItem("user"))["token"]},
            body: JSON.stringify(ban)
        });

        return;    
    }

    remove_ban(player) {
        var url = 'http://localhost:4000/api/bans/' + player;
        
        fetch(url, {
            method:'DELETE',
            headers:{'Content-type':'application/json',
                     'x-access-token': JSON.parse(localStorage.getItem("user"))["token"]},
        });

        return;    
    }

    upgrade_account(player) {
        var url = 'http://localhost:4000/api/users/upgrade/' + player;
        
        fetch(url, {
            method:'PUT',
            headers:{'Content-type':'application/json',
                        'x-access-token': JSON.parse(localStorage.getItem("user"))["token"]},
        });

        return;    
    }

    downgrade_account(player) {
        var url = 'http://localhost:4000/api/users/downgrade/' + player;
        
        fetch(url, {
            method:'PUT',
            headers:{'Content-type':'application/json',
                        'x-access-token': JSON.parse(localStorage.getItem("user"))["token"]},
        });

        return;  
    }
 
}

export default new UserService();