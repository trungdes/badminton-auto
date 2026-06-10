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
    // const team_A = courtPlayers.slice(0,2)
    // const team_B = courtPlayers.slice(2,4)

    const [A,B,C,D] = courtPlayers

    const option_1 = {
        team_A: [A,B],
        team_B: [C,D],
        score: getTeamScore([A,B],[C,D])
    }
    const option_2 = {
        team_A: [A,C],
        team_B: [B,D],
        score: getTeamScore([A,C],[B,D])
    }
    const option_3 = {
        team_A: [A,D],
        team_B: [C,B],
        score: getTeamScore([A,D],[C,B])
    }

    const options = [option_1, option_2, option_3]
    options.sort((a,b) => a.score - b.score)
    const bestOption = options[0]

    updateTeamHistory(bestOption.team_A)
    updateTeamHistory(bestOption.team_B)

    // console.log(options)

    return bestOption
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
// console.log(getNextMatch(players))

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
// updateTeamHistory([players[0], players[1]])
// console.log(players[0].teammates)
// console.log(players[1].teammates)

function addNewRound(){
    const roundResult = getNextMatch(players)
    const newSet = {
        set: matchHistory.length + 1,
        court_1: {
            team_A: roundResult.court_1.team_A.map(p => ({...p})),
            team_B: roundResult.court_1.team_B.map(p => ({...p})),
        },
        court_2: {
            team_A: roundResult.court_2.team_A.map(p => ({...p})),
            team_B: roundResult.court_2.team_B.map(p => ({...p})),
        }
    }
    matchHistory.push(newSet)
    return matchHistory
}

module.exports = {
    addNewRound
}
