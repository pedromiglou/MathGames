
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
    
    async getUsers(username, page, pageSize) {
        var url = 'http://localhost:4000/api/users?orderby=account_level&page=' + page + '&size=' + pageSize + '&username=' + username;
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
            friend1: notification.sender_user.sender_id,
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

    make_friend_request(friend1, friend2) {
        let friends= {
            sender: friend1,
            receiver: friend2,
            notification_type: "F"
        }

        var url = 'http://localhost:4000/api/notifications/';
        fetch(url, {
            method:'POST',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify(friends)
        });

        return;        
    }
 
}

export default new UserService();