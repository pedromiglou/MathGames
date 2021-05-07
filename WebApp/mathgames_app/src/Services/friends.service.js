
class FriendService {
    async getFriends(userId) {
        var url = 'http://localhost:4000/api/friends/' + userId;
        var res = await fetch(url);
        return res.json();
    }
 
}

export default new FriendService();