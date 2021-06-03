
export const EndGameStatements = {
    "win": {
        "timeout": "O teu adversário ficou sem tempo.",
        "invalid_move": "O teu adversário realizou um movimento inválido.",
        0: {
            "reached_goal": "Levaste a peça até à tua casa!", 
            "no_moves": "O teu adversário ficou sem movimentos possíveis!"
        },
        1: {
            "no_moves": "O teu adversário ficou sem movimentos possíveis!"
        }
    },
    "loss": {
        "timeout": "Ficaste sem tempo.",
        "invalid_move": "Realizaste um movimento inválido.",
        0: {
            "reached_goal": "O teu adversário levou a peça até à respetiva casa com sucesso!", 
            "no_moves": "Ficaste sem movimentos possíveis!"},
        1: {
            "no_moves": "Ficaste sem posições onde colocar novas peças."
        }
    }
}