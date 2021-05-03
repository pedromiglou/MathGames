
class NotificationsService {
    async getNotifications(userId) {
        var url = 'http://localhost:4000/api/notifications/' + userId;
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

export default new NotificationsService();