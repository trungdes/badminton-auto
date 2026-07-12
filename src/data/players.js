const players = []
const matchHistory = []


// tạo ngẫu nhiên level
function randomLevel(){
    return Math.floor(Math.random() * 3) + 1
} 

// tạo random 16 players
function generatedRandom(){
    players.length = 0
    for (let i = 1; i <= 16; i++){
        let newPlayer = {
            name: "player_" + i,
            level: randomLevel(),
            playedCount: 0,
            teammates: []
        }
        players.push(newPlayer)
    }
}

// console.log(players)
function addPlayer(name, level){
    const newPlayer = {
        name: name,
        level: level,
        playedCount: 0,
        teammates: []
    }
    players.push(newPlayer)
}   

function removePlayer(name){
    const index = players.findIndex(p => p.name === name)
    if (index !== -1){
        players.splice(index, 1)
    }
}

module.exports = {
    players,
    matchHistory,
    addPlayer,
    removePlayer,
    generatedRandom
}