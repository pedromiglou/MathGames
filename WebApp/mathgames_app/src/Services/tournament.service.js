import {urlAPI} from "./../data/data";

class TournamentService {

    async getTournamentsWithFilters(nome, capacidade, privado) {
        var url = urlAPI + 'api/tournaments?';
        if (privado !== null && privado !== undefined)
            url = url + '&privado='+privado;

        if (nome !== "")
            url = url + '&nome='+nome;
        
        if (capacidade !== "")
            url = url + '&capacidade='+capacidade

        var res = await fetch(url);
        return res.json();
    }

}

export default new TournamentService();