import {urlAPI} from "./../data/data";

class UserService {

    async getUserById(userId) {
        var url = urlAPI + 'api/users/' + userId;
        var res = await fetch(url);
        return res.json();
    }

    async getUserByUsername(username) {
        var url = urlAPI + 'api/users/username/' + username;
        var res = await fetch(url);
        if (res.status !== 200) 
            return null;
        return res.json();
    }

    async getUserRanksById(userId) {
        var url = urlAPI + 'api/userranks/' + userId;
        var res = await fetch(url, {headers: {'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]}});
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
    
    async getUsers(username, min_level, max_level, page, pageSize) {
        var url = urlAPI + 'api/users?orderby=account_level&page=' + page + '&size=' + pageSize + '&username=' + username + '&min_level=' + min_level + '&max_level=' + max_level;
        var res = await fetch(url);
        return res.json();
    }

    async getUsersBanned(username, min_level, max_level, page, pageSize) {
        var url = urlAPI + 'api/users/banned?orderby=account_level&page=' + page + '&size=' + pageSize + '&username=' + username + '&min_level=' + min_level + '&max_level=' + max_level;
        var res = await fetch(url, {headers: {'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]}});
        return res.json();
    }

    async getUsersNormal(username, min_level, max_level, page, pageSize) {
        var url = urlAPI + 'api/users/normal?orderby=account_level&page=' + page + '&size=' + pageSize + '&username=' + username + '&min_level=' + min_level + '&max_level=' + max_level;
        var res = await fetch(url, {headers: {'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]}});
        return res.json();
    }

    async getUsersPrivilege(username, min_level, max_level, page, pageSize) {
        var url = urlAPI + 'api/users/privilege?orderby=account_level&page=' + page + '&size=' + pageSize + '&username=' + username + '&min_level=' + min_level + '&max_level=' + max_level;
        var res = await fetch(url, {headers: {'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]}});
        return res.json();
    }

    async getUsersAdmin(username, min_level, max_level, page, pageSize) {
        var url = urlAPI + 'api/users/admin?orderby=account_level&page=' + page + '&size=' + pageSize + '&username=' + username + '&min_level=' + min_level + '&max_level=' + max_level;
        var res = await fetch(url, {headers: {'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]}});
        return res.json();
    }

    async getReportUsers(page, pageSize) {
        var url = urlAPI + 'api/reports/top?page=' + page + '&size=' + pageSize;
        try {
            var res = await fetch(url, {headers: {'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]}});
            if (res.status !== 200) {
                return {"error": true};
            }
            return res.json();
        }
        catch {
            return {"error": true};
        }
    }


    //Statistics Requests
    async getNumberOfBans() {
        var url = urlAPI + 'api/bans/statistics/';
        try {
            var res = await fetch(url, {headers: {'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]}});
            if (res.status !== 200) {
                return {"error": true};
            }
            return res.json();
        } catch {
            return {"error": true};
        }
    }

    async getNumberOfNewPlayers() {
        var url = urlAPI + 'api/users/statistics/';
        try {
            var res = await fetch(url, {headers: {'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]}});
            if (res.status !== 200) {
                return {"error": true};
            }
            return res.json();
        } catch {
            return {"error": true};
        }
    }


    async getMatchesStatistics() {
        var url = urlAPI + 'api/matches/statistics/';
        try {
            var res = await fetch(url, {headers: {'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]}});
            if (res.status !== 200) {
                return {"error": true};
            }
            return res.json();
        } catch {
            return {"error": true};
        }
    }

    async getMatchesStatistics7Days(game) {
        var url = urlAPI + 'api/matches/statistics?game=' + game;
        try {
            var res = await fetch(url, {headers: {'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]}});
            if (res.status !== 200) {
                return {"error": true};
            }
            return res.json();
        } catch {
            return {"error": true};
        }
    }

    async getMatchesStatisticsByGame() {
        var url = urlAPI + 'api/matches/statisticsbygame/';
        try {
            var res = await fetch(url);
            if (res.status !== 200) {
                return {"error": true};
            }
            return res.json();
        } catch {
            return {"error": true};
        }
    }

    async getRanksStatisticsByGame(name) {
        var url = urlAPI + 'api/userranks/statistics/' + name;
        try {
            var res = await fetch(url, {headers: {'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]}});
            if (res.status !== 200) {
                return {"error": true};
            }
            return res.json();
        } catch {
            return {"error": true};
        }
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

    async accept_friendship(notification) {
        let friends= {
            friend1: notification.sender_user.sender_id,
            friend2: notification.receiver,
        }

        var url = urlAPI + 'api/friends/';
        await fetch(url, {
            method:'POST',
            headers:{'Content-type':'application/json',
                     'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]},
            body: JSON.stringify(friends)
        });

        return;
    }

    async send_notification_request(sender, receiver, not_type, not_text) {
        let request= {
            sender: sender,
            receiver: receiver,
            notification_type: not_type,
            notification_text: not_text
        }

        var url = urlAPI + 'api/notifications/';
        
        await fetch(url, {
            method:'POST',
            headers:{'Content-type':'application/json',
                     'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]},
            body: JSON.stringify(request)
        });

    }



    async send_notification_request_by_username(sender, receiver, not_type, not_text) {
        var url1 = urlAPI + 'api/users/username/'+receiver
        fetch(url1, {headers: {'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]}}).then(res => {
            if (res.status !== 200) {
                return {"error": true};
            }
            res.json().then( async (result) => {
                let request= {
                    sender: sender,
                    receiver: result.id,
                    notification_type: not_type,
                    notification_text: not_text
                }
        
                var url = urlAPI + 'api/notifications/';
                
                await fetch(url, {
                    method:'POST',
                    headers:{'Content-type':'application/json',
                             'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]},
                    body: JSON.stringify(request)
                });
        
            });
        });
    }


    async remove_friend(friend1, friend2) {
        var url = urlAPI + 'api/friends/' + friend1 + "/" + friend2;
        
        await fetch(url, {
            method:'DELETE',
            headers:{'Content-type':'application/json',
                     'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]},
        });

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

    }

    async remove_ban(player) {
        var url = urlAPI + 'api/bans/' + player;
        
        await fetch(url, {
            method:'DELETE',
            headers:{'Content-type':'application/json',
                     'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]},
        });

    }

    async upgrade_account(player) {
        var url = urlAPI + 'api/users/upgrade/' + player;
        
        await fetch(url, {
            method:'PUT',
            headers:{'Content-type':'application/json',
                        'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]},
        });

    }

    async downgrade_account(player) {
        var url = urlAPI + 'api/users/downgrade/' + player;
        
        await fetch(url, {
            method:'PUT',
            headers:{'Content-type':'application/json',
                        'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]},
        });

    }

    convert_user_rank(accountRank) {
        if (accountRank <= 25)
			return 0
		else if (accountRank <= 75)
			return 1
		else if (accountRank <= 175)
			return 2
		else if (accountRank <= 275)
			return 3
		else if (accountRank <= 400)
			return 4
		else if (accountRank <= 550)
			return 5
		else if (accountRank <= 700)
			return 6
		else if (accountRank <= 850)
			return 7
		else if (accountRank <= 1050)
			return 8
		else if (accountRank <= 1250)
			return 9
		else if (accountRank <= 1450)
			return 10
		else if (accountRank <= 1700)
			return 11
		else
			return 12
    }
 
}

export default new UserService();