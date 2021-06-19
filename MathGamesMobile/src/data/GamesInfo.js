
export const gamesInfo = 
    [
        {
            id: 0,
            title: "Rastros",
            img: require("../../public/images/games/rastros.png"),
            hoover: false,
            path: '/gamePage?id=0',
            description: "Jogadores partilham as peças e efetuam uma corrida com uma “bola”, na tentativa de marcar um “auto-golo” ou de encurralar o adversário.",
            age: 6,
            toBeDone: false,
            dificulty: 20,
            rules:  "- Cada jogador desloca a peça de forma alternada para um dos quadrados adjacentes que não esteja bloqueado.\n" +
            "- A posição onde estava a peça é boqueada, sendo que a peça branca não se pode deslocar para posições bloqueadas.\n" +
            "- O jogo começa com a peça na posição e5.",
        },
    
        {
            id: 1,
            title: "Gatos & Cães",
            img: require("../../public/images/games/gatosecaes.png"),
            hoover: false,
            path: '/gamePage?id=1',
            description: "Jogo de estratégia que tem como objetivo colocar por último uma peça no tabuleiro, deixando o adversário sem mais opções de jogada.",
            age: 6,
            toBeDone: false,
            dificulty: 40,
            rules:  "- O jogador 1 corresponde aos gatos, o jogador 2 corresponde aos cães.\n" +
                    "- Cada jogador coloca, de forma alternada, uma peça numa casa vazia.\n" +
                    "- Começam os Gatos e o primeiro gato deve ser colocado em uma das quatro posições centrais do tabuleiro (indicada com cruzes). O primeiro cão deve ser colocado fora dessas quatro posições.\n" +
                    "- Os jogadores não podem colocar um gato ao lado de um cão, nem um cão ao lado de um gato (na horizontal ou na vertical).\n" +
                    "- O primeiro jogador a ficar sem posições onde colocar uma nova peça, perde o jogo.", 
        },
    
        {
            id: 2,
            title: "Yoté",
            img: require("../../public/images/games/yote.png"),
            hoover: false,
            path: '/gamePage?id=2',
            description: "O objetivo principal é capturar todas as peças do adversário ou bloquear as que restam. Neste caso vence aquele que tiver maior número de peças capturadas.",
            age: 6,
            toBeDone: true,
        },
    
        {
            id: 3,
            title: "Produto",
            img: require("../../public/images/games/produto.png"),
            hoover: false,
            path: '/gamePage?id=3',
            description: "Permite a prática de exercícios de otimização. O objetivo é obter o maior produto, entre elementos dos maiores grupos da respetiva cor.",
            age: 15,
            toBeDone: true,
        },
    
    ];