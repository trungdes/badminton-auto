const {players, matchHistory} = require('../data/players.js')

const selectedPlayer = players.slice(0, 8)

// hàm tăng số set của player 
function checked (selectedPlayer){
    selectedPlayer.forEach(p => {
    p.playedCount++   
})
}

//hàm sắp xếp
function sort(array){
    array.sort((a, b) => a.level - b.level)
}

//chia team theo từng sân   
function createTeamForCourt(courtPlayers){
    const team_A = courtPlayers.slice(0,2)
    const team_B = courtPlayers.slice(2,4)

    return {
        team_A,
        team_B
    }
}

//tính điểm cho từng cặp nếu đã đánh chung
function getPairScore(playerA, playerB){
    return hasPLayedTogether(playerA, playerB) ? 1 : 0
}

function getTeamScore(teamA, teamB){
    const score = getPairScore(teamA[0], teamA[1]) + getPairScore(teamB[0], teamB[1])
    return score
}

//kiếm trận tiếp theo
function getNextMatch(allPlayers){
    allPlayers.sort((a,b) => a.playedCount - b.playedCount)

    const selected = allPlayers.slice(0, 8)

    checked(selected)
    sort(selected)
    
    const court_1 = createTeamForCourt(selected.slice(0,4))
    const court_2 = createTeamForCourt(selected.slice(4,8))
    return {
        court_1,
        court_2
    }
}
console.log(getNextMatch(players))

//kiểm tra nếu đã đánh chung
function hasPLayedTogether(playerA, playerB){
    if(playerA.teammates.includes(playerB.name)){
        return true
    }else {
        return false
    }
}

//cập nhật lịch sử chơi cùng
function updateTeamHistory(team){
    const playerA = team[0]
    const playerB = team[1]
    if (hasPLayedTogether(playerA, playerB) === false){
        playerA.teammates.push(playerB.name)
    }
    if (hasPLayedTogether(playerB, playerA) === false){
        playerB.teammates.push(playerA.name)
    }
}
updateTeamHistory([players[0], players[1]])
console.log(players[0].teammates)
console.log(players[1].teammates)

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