
class UserService {
    async getFriends(userId) {
        var url = 'http://localhost:4000/api/friends/' + userId;
        var res = await fetch(url);
        return res.json();
    }


    async getNotifications(userId) {
        var url = 'http://localhost:4000/api/notifications/' + userId;
        var res = await fetch(url);
        return res.json();
    }

    async getLastGames(userId) {
        var url = 'http://localhost:4000/api/matches?userid=' + userId;
        var res = await fetch(url);
        return res.json();
    }
    
    async getUsers() {
        var url = 'http://localhost:4000/api/users?orderby=account_level';
        var res = await fetch(url);
        return res.json();
    }
    
    delete(notificationId) {
        var url = 'http://localhost:4000/api/notifications/' + notificationId;
        fetch(url, {
            method:'DELETE'
        });
        return;
    }

    accept_friendship(notification) {
        let friends= {
            friend1: notification.sender_id,
            friend2: notification.receiver,
        }

        var url = 'http://localhost:4000/api/friends/';
        fetch(url, {
            method:'POST',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify(friends)
        });        
        

        url = 'http://localhost:4000/api/notifications/' + notification.id;
        fetch(url, {
            method:'DELETE'
        });
        return;
        
    }
 
}

export default new UserService();