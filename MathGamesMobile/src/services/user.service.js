import { urlAPI } from "./../data/data";
import { readData, saveData } from "./../utilities/AsyncStorage";

class UserService {
	/*
    async getUserRanksById(userId) {
        var url = urlAPI + 'api/userranks/' + userId;
        var res = await fetch(url, {headers: {'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]}});
        return res.json();
    }*/

    async getUserById(userId) {
        var url = urlAPI + 'api/users/' + userId;
        var res = await fetch(url);
        return res.json();
    }

	async getFriends() {
		var user = JSON.parse(JSON.parse(await readData("user")));
		var url = urlAPI + "api/friends/" + user.id;
		var token = user.token;

		var res = await fetch(url, { headers: { "x-access-token": token } });
		if (res.status !== 200) return { error: true };
		return res.json();
	}

	async remove_friend(friend1, friend2) {
		var user = JSON.parse(JSON.parse(await readData("user")));
		var token = user.token;

		var url = urlAPI + "api/friends/" + friend1 + "/" + friend2;

		var res = await fetch(url, {
			method: "DELETE",
			headers: {
				"Content-type": "application/json",
				"x-access-token": token,
			},
		});

        if (res.status !== 200) return { error: true };
		return res.json();

	}


    async getUsers(username, min_level, max_level, page, pageSize) {
        var url = urlAPI + 'api/users?orderby=account_level&page=' + page + '&size=' + pageSize + '&username=' + username + '&min_level=' + min_level + '&max_level=' + max_level;
        var res = await fetch(url);
        return res.json();
    }


    /* async send_notification_request(sender, receiver, not_type) {
        var user = JSON.parse(JSON.parse(await readData("user")));
		var token = user.token;

        let request= {
            sender: sender,
            receiver: receiver,
            notification_type: not_type
        }

        console.log(sender)
        console.log(receiver)
        console.log(not_type)

        var url = urlAPI + 'api/notifications/';
        
        var xx = await fetch(url, {
            method:'POST',
            headers:{'Content-type':'application/json',
                     'x-access-token': token},
            body: JSON.stringify(request)
        });

        console.log(xx)

        return;        
    } */


    async getLastGames(userId) {
        var user = JSON.parse(JSON.parse(await readData("user")));
		var token = user.token;

        var url = urlAPI + 'api/matches?userid=' + userId;
        var res = await fetch(url, {headers: {'x-access-token': token}});
        if (res.status !== 200) {
            return {'error': true}
        }
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
        
        readData("user").then((user) => {
            fetch(url, {
                method:'PUT',
                headers:{'Content-type':'application/json',
                        'x-access-token': JSON.parse(JSON.parse(user))["token"]},
                body: JSON.stringify(avatar)
            });
        })

        return;        
    }

    async getNotifications(userId) {
        var url = urlAPI + 'api/notifications/' + userId;
        var res = await fetch(url, {headers: {'x-access-token': token}});
        return res.json();
    }

    /*
    async getLastGames(userId) {
        var url = urlAPI + 'api/matches?userid=' + userId;
        var res = await fetch(url, {headers: {'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]}});
        if (res.status !== 200) {
            return {'error': true}
        }
        return res.json();
    }*/
    
    async getUsers(username) {
        var url = urlAPI + 'api/users?orderby=account_level&page=0&size=50&username=' + username;
        var res = await fetch(url);
        return res.json();
    }

    /*
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
    }*/

    accept_friendship(notification, token) {
        let friends= {
            friend1: notification.sender_user.sender_id,
            friend2: notification.receiver,
        }

        var url = urlAPI + 'api/friends/';
        fetch(url, {
            method:'POST',
            headers:{'Content-type':'application/json',
                     'x-access-token': token},
            body: JSON.stringify(friends)
        });

        return;
    }

    async send_notification_request(sender, receiver, not_type, token) {
        let request= {
            sender: sender,
            receiver: receiver,
            notification_type: not_type
        }

        var url = urlAPI + 'api/notifications/';
        
        await fetch(url, {
            method:'POST',
            headers:{'Content-type':'application/json',
                     'x-access-token': token},
            body: JSON.stringify(request)
        });

        return;        
    }


    async report_player(sender, receiver, reason) {
        var user = JSON.parse(JSON.parse(await readData("user")));
		var token = user.token;

        let report= {
            reason: reason,
            receiver: receiver,
            sender: sender,
        }

        var url = urlAPI + 'api/reports/';
        
        let res = await fetch(url, {
            method:'POST',
            headers:{'Content-type':'application/json',
                     'x-access-token': token},
            body: JSON.stringify(report)
        });

        if (res.status === 405) 
            return { error: true, report_already_made: true};

        if (res.status !== 200) 
            return { error: true, report_already_made: false };
        
        return { error: false, report_already_made: false };
    }


    /*
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
    }*/
}

export default new UserService();
