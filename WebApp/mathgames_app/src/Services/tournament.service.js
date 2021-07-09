import {urlAPI} from "./../data/data";

class TournamentService {

    async getTournamentById(tournament_id) {
        var url = urlAPI + 'api/tournaments/' + tournament_id;
        var res = await fetch(url, {
            method:'GET',
            headers:{'Content-type':'application/json',
            'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]}});
        return res.json();
    }

    async getTournamentByName(name) {
        var url = urlAPI + 'api/tournaments/name/' + name;
        var res = await fetch(url, {
            method:'GET',
            headers:{'Content-type':'application/json',
            'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]}});
        if (res.status !== 200) 
            return null;
        return res.json();
    }

    async getTournamentByCreator(creator_id, page, pageSize) {
        var url = urlAPI + 'api/tournaments/creator/' + creator_id + '?page=' + page + '&size=' + pageSize;
        console.log(url);
        var res = await fetch(url, {
            method:'GET',
            headers:{'Content-type':'application/json',
            'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]}});
        console.log(res);
        return res.json();
    }


    async getTournamentsWithFilters(nome, capacidade, privado, jogos, page, pageSize) {
        var url = urlAPI + 'api/tournaments?page=' + page + '&size=' + pageSize;
        if (jogos !== null) {
            url = url +'&jogos='+jogos;
        }
        if (privado !== null && privado !== undefined)
            url = url + '&private='+privado;

        if (nome !== "")
            url = url + '&name='+nome;
        
        if (capacidade !== "")
            url = url + '&capacity='+capacidade

        var res = await fetch(url, {
            method:'GET',
            headers:{'Content-type':'application/json',
            'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]}});
        return res.json();
    }

    async getTournamentsByUser(user_id) {
        var url = urlAPI + 'api/tournamentusers/findbyuser/'+ user_id;
        var res = await fetch(url, {
            method:'GET',
            headers:{'Content-type':'application/json',
            'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]}});
        return res.json();
    }

    async getPlayersByTournament(tournament_id) {
        var url = urlAPI + 'api/tournamentusers/findbytournament/'+ tournament_id;
        var res = await fetch(url, {
            method:'GET',
            headers:{'Content-type':'application/json',
            'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]}});
        return res.json();
    }

    async getMatchesByTournament(tournament_id) {
        var url = urlAPI + 'api/tournamentmatches/findbytournament/'+ tournament_id;
        var res = await fetch(url, {
            method:'GET',
            headers:{'Content-type':'application/json',
            'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]}});
        return res.json();
    }


    async createTournament(name, max_users, privado, password, game_id, creator) {
        var url = urlAPI + 'api/tournaments';
        var tournament = {
            name: name,
            max_users: max_users,
            private: privado,
            password: password,
            game_id: game_id,
            creator: creator
        }
        var res = await fetch(url, {
            method:'POST',
            headers:{'Content-type':'application/json',
                     'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]},
            body: JSON.stringify(tournament)
        });
        if (res.status !== 200) {
            if (res.status === 400) {
                return {error: true, message: "Tournament name is already in use!"}
            } else {
                return {error: true, message: "Internal Server Error"}
            }
        }
        return {error: false};
    }

    async changeDescription(tournament_id, description) {
        var url = urlAPI + 'api/tournaments/' + tournament_id;
        var tournament = {
            description: description
        }
        
        var res = await fetch(url, {
            method:'PUT',
            headers:{'Content-type':'application/json',
                     'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]},
            body: JSON.stringify(tournament)
        });
        if (res.status !== 200) {
            return {error: true}
        }
        return {error: false};
    }

    async initializeTournament(tournamentId) {
        var url = urlAPI + 'api/tournaments/initialize'

        var tournament = {
            tournament_id: tournamentId
        }

        var res = await fetch(url, {
            method:'POST',
            headers:{'Content-type':'application/json',
                     'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]},
            body: JSON.stringify(tournament)
        });
        if (res.status !== 200) {
            if (res.status === 404)
                return {error: true, message: "The tournament should have atleast 3 players"}
            else
                return {error: true}
        }
        return {error: false};

    }

    async initializeNextRound(tournamentId) {
        var url = urlAPI + 'api/tournaments/initializeround'

        var tournament = {
            tournament_id: tournamentId
        }

        var res = await fetch(url, {
            method:'POST',
            headers:{'Content-type':'application/json',
                     'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]},
            body: JSON.stringify(tournament)
        });
        if (res.status !== 200) {
            return {error: true}
        }
        return {error: false};

    }

    async removeTournament(tournamentId) {
        var url = urlAPI + 'api/tournaments/'+tournamentId

        var res = await fetch(url, {
            method:'DELETE',
            headers:{'Content-type':'application/json',
                     'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]},
        });
        if (res.status !== 200) {
            return {error: true}
        }
        return {error: false};

    }

    async jointTournament(tournamentId, playerId, password) {
        var url = urlAPI + 'api/tournaments/join';

        const request = {
            torneio: tournamentId,
            player: playerId,
            password: password
        };

        var res = await fetch(url, {
            method:'POST',
            headers:{'Content-type':'application/json',
                     'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]},
            body: JSON.stringify(request)
        });
        if (res.status !== 200) {
            return {error: true}
        }
        return {error: false};

    }


    async leaveTournament(tournamentId, playerId) {
        var url = urlAPI + 'api/tournamentusers/'+tournamentId + '/' + playerId;

        var res = await fetch(url, {
            method:'DELETE',
            headers:{'Content-type':'application/json',
                     'x-access-token': JSON.parse(sessionStorage.getItem("user"))["token"]},
        });
        if (res.status !== 200) {
            return {error: true}
        }
        return {error: false};

    }

}

export default new TournamentService();