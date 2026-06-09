const {players, matchHistory} = require('src\data\players.js')

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

module.exports = {
    addNewRound
}