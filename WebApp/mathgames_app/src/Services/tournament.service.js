import {urlAPI} from "./../data/data";

class TournamentService {

    async getTournamentsWithFilters(nome, capacidade, privado, page, pageSize) {
        var url = urlAPI + 'api/tournaments?page=' + page + '&size=' + pageSize;
        if (privado !== null && privado !== undefined)
            url = url + '&private='+privado;

        if (nome !== "")
            url = url + '&name='+nome;
        
        if (capacidade !== "")
            url = url + '&capacity='+capacidade

        var res = await fetch(url);
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
            return {error: true}
        }
        return {error: false};
    }

}

export default new TournamentService();