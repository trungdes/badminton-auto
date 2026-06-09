const players = []
const matchHistory = []
const teammates = []

// tạo ngẫu nhiên level
function randomLevel(){
    return Math.floor(Math.random() * 3) + 1
} 

// tạo random 16 players
for (let i = 1; i <= 16; i++){
    let newPlayer = {
        name: "player_" + i,
        level: randomLevel(),
        playedCount: 0
    }
    players.push(newPlayer)
}

module.exports = {
    players,
    matchHistory
}