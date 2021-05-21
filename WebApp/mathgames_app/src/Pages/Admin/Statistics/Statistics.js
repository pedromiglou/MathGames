import './Statistics.css';
import * as FaIcons from 'react-icons/fa';

function Statistics() {
    return (
        <div className="Statistics">
            <h1>Estatisticas Gerais</h1>
            <div className="Section">
                <div className="statsGames shadow3D">
                    {/* Aqui tem de se meter isto a ir buscar os dados a API, com o rank dos jogos e dps com a resposta fazer um ciclo for */}
                    <h2>Jogos</h2>
                    <table className="table table-borderless">
                    <thead>
                        <tr>
                        <th scope="col">Rank</th>
                        <th scope="col">Jogo</th>
                        <th scope="col">Atualização</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">1</th>
                        <td>Rastros</td>
                        <td>+1</td>
                        <td><FaIcons.FaSearch/></td>
                        </tr>
                        <tr>
                        <th scope="row">2</th>
                        <td>Yoté</td>
                        <td>-1</td>
                        <td><FaIcons.FaSearch/></td>
                        </tr>
                        <tr>
                        <th scope="row">3</th>
                        <td>Cães&Gatos</td>
                        <td>=</td>
                        <td><FaIcons.FaSearch/></td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                <div className="statsTournaments shadow3D">
                    <h2>Torneios</h2>
                    <h1>Aqui n sei mt bem o que se vai por ainda, mas vai ser estatisticas de torneios</h1>
                </div>
            </div>
            
            <div className="Section">
                <div className="statsPlayers shadow3D">
                    <h2>Jogadores</h2>
                    <h1>Estatisticas relacionadas com os jogadore</h1>
                </div>
                <div className="statsBannedPlayers shadow3D">
                    <h2>Jogadores Banidos</h2>
                    <h1>Jogadores banidos com graficos com os diferentes motivos e numero de banidos</h1>
                </div>
            </div>
            
        </div>
    )
}

export default Statistics;