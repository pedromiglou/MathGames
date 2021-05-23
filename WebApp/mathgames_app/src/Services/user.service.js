
class UserService {


    async getUserById(userId) {
        var url = 'http://localhost:4000/api/users/' + userId;
        var res = await fetch(url);
        return res.json();
    }

    async getFriends(userId) {
        var url = 'http://localhost:4000/api/friends/' + userId;
        var res = await fetch(url, {headers: {'x-access-token': JSON.parse(localStorage.getItem("user"))["token"]}});
        if (res.status !== 200) 
            return { error: true };
        return res.json();
    }

    async getNotifications(userId) {
        var url = 'http://localhost:4000/api/notifications/' + userId;
        var res = await fetch(url, {headers: {'x-access-token': JSON.parse(localStorage.getItem("user"))["token"]}});
        return res.json();
    }

    async getLastGames(userId) {
        var url = 'http://localhost:4000/api/matches?userid=' + userId;
        var res = await fetch(url, {headers: {'x-access-token': JSON.parse(localStorage.getItem("user"))["token"]}});
        if (res.status !== 200) {
            return {'error': true}
        }
        return res.json();
    }
    
    async getUsers(username, page, pageSize) {
        var url = 'http://localhost:4000/api/users?orderby=account_level&page=' + page + '&size=' + pageSize + '&username=' + username;
        var res = await fetch(url);
        return res.json();
    }

    async getUsersBanned(username, page, pageSize) {
        var url = 'http://localhost:4000/api/users/banned?orderby=account_level&page=' + page + '&size=' + pageSize + '&username=' + username;
        var res = await fetch(url, {headers: {'x-access-token': JSON.parse(localStorage.getItem("user"))["token"]}});
        return res.json();
    }

    async getNumberOfBans() {
        var url = 'http://localhost:4000/api/bans/statistics/';
        var res = await fetch(url, {headers: {'x-access-token': JSON.parse(localStorage.getItem("user"))["token"]}});
        return res.json();
    }

    async getMatchesStatistics() {
        var url = 'http://localhost:4000/api/matches/statistics/';
        var res = await fetch(url, {headers: {'x-access-token': JSON.parse(localStorage.getItem("user"))["token"]}});
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
        var url = 'http://localhost:4000/api/notifications/' + notificationId;
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

        var url = 'http://localhost:4000/api/friends/';
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

        var url = 'http://localhost:4000/api/notifications/';
        
        fetch(url, {
            method:'POST',
            headers:{'Content-type':'application/json',
                     'x-access-token': JSON.parse(localStorage.getItem("user"))["token"]},
            body: JSON.stringify(friends)
        });

        return;        
    }


    async remove_friend(friend1, friend2) {
        var url = 'http://localhost:4000/api/friends/' + friend1 + "/" + friend2;
        
        await fetch(url, {
            method:'DELETE',
            headers:{'Content-type':'application/json',
                     'x-access-token': JSON.parse(localStorage.getItem("user"))["token"]},
        });

        return;    
    }
    
    report_player(friend1, friend2) {
        // TODO    
    }

    async ban_player(player) {
        let ban= {
            reason: "New Ban",
            user_id: player
        }

        var url = 'http://localhost:4000/api/bans/';
        
        await fetch(url, {
            method:'POST',
            headers:{'Content-type':'application/json',
                     'x-access-token': JSON.parse(localStorage.getItem("user"))["token"]},
            body: JSON.stringify(ban)
        });

        return;    
    }

    async remove_ban(player) {
        var url = 'http://localhost:4000/api/bans/' + player;
        
        await fetch(url, {
            method:'DELETE',
            headers:{'Content-type':'application/json',
                     'x-access-token': JSON.parse(localStorage.getItem("user"))["token"]},
        });

        return;    
    }

    async upgrade_account(player) {
        var url = 'http://localhost:4000/api/users/upgrade/' + player;
        
        await fetch(url, {
            method:'PUT',
            headers:{'Content-type':'application/json',
                        'x-access-token': JSON.parse(localStorage.getItem("user"))["token"]},
        });

        return;    
    }

    async downgrade_account(player) {
        var url = 'http://localhost:4000/api/users/downgrade/' + player;
        
        await fetch(url, {
            method:'PUT',
            headers:{'Content-type':'application/json',
                        'x-access-token': JSON.parse(localStorage.getItem("user"))["token"]},
        });

        return;  
    }
 
}

export default new UserService();