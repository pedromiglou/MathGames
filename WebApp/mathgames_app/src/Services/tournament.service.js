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

}

export default new TournamentService();