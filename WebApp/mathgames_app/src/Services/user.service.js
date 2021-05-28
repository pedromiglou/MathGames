import {urlAPI} from "./../data/data";

class UserService {

    async getUserById(userId) {
        var url = urlAPI + 'api/users/' + userId;
        var res = await fetch(url);
        return res.json();
    }

    async getUserRanksById(userId) {
        var url = urlAPI + 'api/userranks/' + userId;
        var res = await fetch(url);
        return res.json();
    }


    async getFriends(userId) {
        var url = urlAPI + 'api/friends/' + userId;
        var res = await fetch(url, {headers: {'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]}});
        if (res.status !== 200) 
            return { error: true };
        return res.json();
    }

    async getNotifications(userId) {
        var url = urlAPI + 'api/notifications/' + userId;
        var res = await fetch(url, {headers: {'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]}});
        return res.json();
    }

    async getLastGames(userId) {
        var url = urlAPI + 'api/matches?userid=' + userId;
        var res = await fetch(url, {headers: {'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]}});
        if (res.status !== 200) {
            return {'error': true}
        }
        return res.json();
    }
    
    async getUsers(username, page, pageSize) {
        var url = urlAPI + 'api/users?orderby=account_level&page=' + page + '&size=' + pageSize + '&username=' + username;
        var res = await fetch(url);
        return res.json();
    }

    async getUsersBanned(username, page, pageSize) {
        var url = urlAPI + '/api/users/banned?orderby=account_level&page=' + page + '&size=' + pageSize + '&username=' + username;
        var res = await fetch(url, {headers: {'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]}});
        return res.json();
    }


    //Statistics Requests
    async getNumberOfBans() {
        var url = urlAPI + 'api/bans/statistics/';
        var res = await fetch(url, {headers: {'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]}});
        return res.json();
    }

    async getNumberOfNewPlayers() {
        var url = urlAPI + 'api/users/statistics/';
        var res = await fetch(url, {headers: {'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]}});
        return res.json();
    }


    async getMatchesStatistics() {
        var url = urlAPI + 'api/matches/statistics/';
        var res = await fetch(url, {headers: {'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]}});
        return res.json();
    }

    async getMatchesStatisticsByGame() {
        var url = urlAPI + 'api/matches/statisticsbygame/';
        var res = await fetch(url, {headers: {'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]}});
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

        var url = urlAPI + 'api/users/' + user;
        
        await fetch(url, {
            method:'PUT',
            headers:{'Content-type':'application/json',
                     'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]},
            body: JSON.stringify(avatar)
        });

        return;        
    }

    delete(notificationId) {
        var url = urlAPI + 'api/notifications/' + notificationId;
        fetch(url, {
            method:'DELETE',
            headers: {'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]}
        });
        return;
    }

    accept_friendship(notification) {
        let friends= {
            friend1: notification.sender_user.sender_id,
            friend2: notification.receiver,
        }

        var url = urlAPI + 'api/friends/';
        fetch(url, {
            method:'POST',
            headers:{'Content-type':'application/json',
                     'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]},
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

        var url = urlAPI + 'api/notifications/';
        
        fetch(url, {
            method:'POST',
            headers:{'Content-type':'application/json',
                     'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]},
            body: JSON.stringify(friends)
        });

        return;        
    }


    async remove_friend(friend1, friend2) {
        var url = urlAPI + 'api/friends/' + friend1 + "/" + friend2;
        
        await fetch(url, {
            method:'DELETE',
            headers:{'Content-type':'application/json',
                     'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]},
        });

        return;    
    }
    
    async report_player(sender, receiver, reason) {
        let report= {
            sender: sender,
            receiver: receiver,
            reason: reason
        }

        var url = urlAPI + 'api/reports/';
        
        let res = await fetch(url, {
            method:'POST',
            headers:{'Content-type':'application/json',
                     'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]},
            body: JSON.stringify(report)
        });

        if (res.status === 405) 
            return { error: true, report_already_made: true};
        if (res.status !== 200) 
            return { error: true, report_already_made: false };
        
        return { error: false, report_already_made: false };
    }

    async ban_player(player) {
        let ban= {
            reason: "New Ban",
            user_id: player
        }

        var url = urlAPI + 'api/bans/';
        
        await fetch(url, {
            method:'POST',
            headers:{'Content-type':'application/json',
                     'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]},
            body: JSON.stringify(ban)
        });

        return;    
    }

    async remove_ban(player) {
        var url = urlAPI + 'api/bans/' + player;
        
        await fetch(url, {
            method:'DELETE',
            headers:{'Content-type':'application/json',
                     'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]},
        });

        return;    
    }

    async upgrade_account(player) {
        var url = urlAPI + 'api/users/upgrade/' + player;
        
        await fetch(url, {
            method:'PUT',
            headers:{'Content-type':'application/json',
                        'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]},
        });

        return;    
    }

    async downgrade_account(player) {
        var url = urlAPI + 'api/users/downgrade/' + player;
        
        await fetch(url, {
            method:'PUT',
            headers:{'Content-type':'application/json',
                        'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]},
        });

        return;  
    }
 
}

export default new UserService();