import * as FaIcons from 'react-icons/fa';

export const games_info = 
    {
        0: {
            id: 0,
            title: "Rastros",
            img: process.env.PUBLIC_URL + "/images/games/rastros.png",
            hoover: false,
            path: '/gamePage?id=0',
            description: "Jogadores partilham as peças e efetuam uma corrida com uma “bola”, na tentativa de marcar um “auto-golo” ou de encurralar o adversário.",
            age: 6,
            toBeDone: false,
            dificulty: 20,
            dificulty_label: "fácil",
            rules:  "- Cada jogador desloca a peça de forma alternada para um dos quadrados adjacentes que não esteja bloqueado.\n" +
                    "- A posição onde estava a peça é boqueada, sendo que a peça branca não se pode deslocar para posições bloqueadas.\n" +
                    "- O jogo começa com a peça na posição e5. \n" +
                    "- Cada jogador possuí um total de 5 minutos para efetuar todas as jogadas no jogo. O tempo disponível está visível junto às informações de cada jogador. \n" ,
            goal:   "- A vitória é obtida pelo jogador que conseguir deslocar a peça até à sua casa ou se conseguri deixar o oponente sem jogadas possíveis, impedindo-o de jogar.",
        },
    
        1: {
            id: 1,
            title: "Gatos & Cães",
            img: process.env.PUBLIC_URL + "/images/games/gatosecaes.png",
            hoover: false,
            path: '/gamePage?id=1',
            description: "Jogo de estratégia que tem como objetivo colocar por último uma peça no tabuleiro, deixando o adversário sem mais opções de jogada.",
            age: 6,
            toBeDone: false,
            dificulty: 40,
            dificulty_label: "fácil",
            rules:  "- O jogador 1 corresponde aos gatos, o jogador 2 corresponde aos cães.\n" +
                    "- Cada jogador coloca, de forma alternada, uma peça numa casa vazia.\n" +
                    "- Começam os Gatos e o primeiro gato deve ser colocado em uma das quatro posições centrais do tabuleiro (indicada com cruzes). O primeiro cão deve ser colocado fora dessas quatro posições.\n" +
                    "- Os jogadores não podem colocar um gato ao lado de um cão, nem um cão ao lado de um gato (na horizontal ou na vertical).\n" +
                    "- O primeiro jogador a ficar sem posições onde colocar uma nova peça, perde o jogo. \n" +
                    "- Cada jogador possuí um total de 5 minutos para efetuar todas as jogadas no jogo. O tempo disponível está visível junto às informações de cada jogador. \n" , 
            goal:   "- O jogador que efetuar a última jogada do jogo, deixando o seu oponente sem jogadas possíveis, é o vencedor."
        },
    
        2: {
            id: 2,
            title: "Yoté",
            img: process.env.PUBLIC_URL + "/images/games/yote.png",
            hoover: false,
            path: '/gamePage?id=2',
            description: "O objetivo principal é capturar todas as peças do adversário ou bloquear as que restam. Neste caso vence aquele que tiver maior número de peças capturadas.",
            age: 6,
            toBeDone: true,
            icon: <FaIcons.FaHammer/>,
        },
    
        3: {
            id: 3,
            title: "Produto",
            img: process.env.PUBLIC_URL + "/images/games/produto.png",
            hoover: false,
            path: '/gamePage?id=3',
            description: "Permite a prática de exercícios de otimização. O objetivo é obter o maior produto, entre elementos dos maiores grupos da respetiva cor.",
            age: 15,
            toBeDone: true,
            icon: <FaIcons.FaHammer/>,
        },
    
        4: {
            id: 4,
            title: "Avanço",
            img: process.env.PUBLIC_URL + "/images/games/avanco.png",
            hoover: false,
            path: '/gamePage?id=4',
            description: "Este jogo, em que as capturas não são obrigatórias mas sim estratégicas, tem como principal objetivo chegar em primeiro lugar à primeira linha do adversário.",
            age: 12,
            toBeDone: true,
            icon: <FaIcons.FaHammer/>,
        },

        5: {
            id: 5,
            title: "Operações",
            img: process.env.PUBLIC_URL + "/images/games/avanco.png",
            hoover: false,
            path: '/gamePage?id=5',
            description: "Jogo em que cada participante efetua duas operações aritméticas quaisquer, com os valores que saem nos dados, por forma a obter o número da casa seguinte à que se encontra. De seguida avança para essa casa, e ganha quem chegar á casa nove.",
            age: 6,
            toBeDone: true,
            icon: <FaIcons.FaHammer/>,
        },

        6: {
            id: 6,
            title: "Hex",
            img: process.env.PUBLIC_URL + "/images/games/avanco.png",
            hoover: false,
            path: '/gamePage?id=6',
            description: "O jogo envolve dois jogadores dispondo de peças de cores diferentes. O jogo é jogado num tabuleiro hexagonal sendo o objectivo de ambos os jogadores criarem um caminho que una as duas margens da sua cor. Neste jogo não há capturas, preenchendo-se sequencialmente o tabuleiro de peças.",
            age: 12,
            toBeDone: true,
            icon: <FaIcons.FaHammer/>,
        },

        7: {
            id: 7,
            title: "Ouri",
            img: process.env.PUBLIC_URL + "/images/games/avanco.png",
            hoover: false,
            path: '/gamePage?id=7',
            description: "No tabuleiro existem duas filas, cada uma com seis buracos circulares, chamados casas, nos quais se encontram as sementes em jogo. Cada extremidade do tabuleiro é ocupada por um buraco maior, designado por depósito, destinado a guardar as sementes capturadas ao adversário ao longo do jogo. Participam no jogo dois jogadores e estes jogam alternadamente. O depósito de cada um é o que fica à sua direita. O objectivo do jogo é recolher mais sementes que o adversário. Vence o jogador que obtiver 25 (ou mais) sementes.",
            age: 12,
            toBeDone: true,
            icon: <FaIcons.FaHammer/>,
        },

        8: {
            id: 8,
            title: "Semáforo",
            img: process.env.PUBLIC_URL + "/images/games/avanco.png",
            hoover: false,
            path: '/gamePage?id=8',
            description: "O jogo envolve dois jogadores que vão fazendo uma jogada de cada vez. É jogado num tabuleiro com 4 colunas e 3 linhas. Cada jogada pode ser feita de três maneiras: ou se larga uma peça verde num quadrado vazio, ou se transforma uma peça verde que esteja no tabuleiro numa peça amarela, ou se transforma uma peça amarela que esteja no tabuleiro numa peça vermelha. Ganha o primeiro jogador que conseguir fazer um três em linha da mesma cor na vertical, horizontal ou diagonal.",
            age: 8,
            toBeDone: true,
            icon: <FaIcons.FaHammer/>,
        },

        9: {
            id: 9,
            title: "Amazonas",
            img: process.env.PUBLIC_URL + "/images/games/avanco.png",
            hoover: false,
            path: '/gamePage?id=9',
            description: "Cada jogador dispõe de algumas peças, todas iguais, as amazonas. Cada movimento consiste em deslocar uma amazon e, logo de seguida, em disparar em direcção a qualquer casa do tabuleiro (vazia) atingível a partir da casa de chegada da peça deslocada; o quadrado atingido fica para sempre indisponível para ambos os jogadores. Não se pode sequer saltar sobre ele. Não há capturas. Como em cada jogada desaparece uma casa do tabuleiro, o jogo tem de acabar. Perde quem se vir privado de movimentos legais.",
            age: 8,
            toBeDone: true,
            icon: <FaIcons.FaHammer/>,
        },

        10: {
            id: 10,
            title: "Go",
            img: process.env.PUBLIC_URL + "/images/games/avanco.png",
            hoover: false,
            path: '/gamePage?id=10',
            description: "É jogado nas intersecções de um tabuleiro quadrado de 19 linhas por 19 colunas. Cada jogador coloca uma peça da sua cor numa intersecção vazia. Se, como consequência de colocar a nova peça, algum grupo adversário ficar sem liberdades, esse grupo é capturado e removido do tabuleiro, sendo as respectivas peças designadas por prisioneiros. É objectivo do jogo levar o adversário a não conseguir jogar de forma consecutiva.",
            age: 14,
            toBeDone: true,
            icon: <FaIcons.FaHammer/>,
        },

        11: {
            id: 11,
            title: "Pontos & Quadrados",
            img: process.env.PUBLIC_URL + "/images/games/avanco.png",
            hoover: false,
            path: '/gamePage?id=11',
            description: "Alternadamente, cada jogador une dois pontos vizinhos com um segmento horizontal ou vertical. Quando um deles completa um quadrado, escreve a sua inicial no interior do quadrado e joga outra vez. O objectivo do jogo é obter o maior número de quadrados com o seu nome.",
            age: "5-8",
            toBeDone: true,
            icon: <FaIcons.FaHammer/>,
        },
    };