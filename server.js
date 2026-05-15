const express = require('express')

const app = express();
const path = require('path')
const PORT = 3000


app.use(express.static('public'));

app.get('/match-history', (req,res) => {
    addNewRound(1);
    res.json({
        matchHistory: matchHistory, 
        players: players    
    })
})

app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});

const players = []
const matchHistory = []

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

//hàm xáo trộn players
function shuffle(array){
    const n = array.length
    for(let i = n - 1; i > 0; i-- ){
        const random = Math.floor(Math.random() * ( i + 1));
        [array[i], array[random]] = [array[random], array[i]]
    }
}
shuffle(players)

const selectedPlayer = players.slice(0, 8)


// hàm tăng số set của player 
function checked (selectedPlayer){
    selectedPlayer.forEach(p => {
    p.playedCount++   
})
}

function sort(array){
    array.sort((a, b) => a.level - b.level)
}

// checked(selectedPlayer)
// sort(selectedPlayer)

// const court_1 = selectedPlayer.slice(0,4)
// const court_2 = selectedPlayer.slice(4,8)

// matchHistory.push(court_1)
// matchHistory.push(court_2)

// const waitingList = players.filter(p => p.playedCount === 0)


function getNextMatch(allPlayers){
    allPlayers.sort((a,b) => a.playedCount - b.playedCount)

    const selected = allPlayers.slice(0, 8)

    checked(selected)
    sort(selected)
    return {
        court_1: selected.slice(0, 4),
        court_2: selected.slice(4, 8)
    }
}

function addNewRound(){
    const roundResult = getNextMatch(players)
    const newSet = {
        set: matchHistory.length + 1,
        court_1: roundResult.court_1.map(p => ({...p})),
        court_2: roundResult.court_2.map(p => ({...p}))
    }
    matchHistory.push(newSet)
    return matchHistory
}

// console.log(...addNewRound())
// console.log(...addNewRound(1))
// console.log(...addNewRound(1))

// console.log(players)