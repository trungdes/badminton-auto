const arrangeBtn = document.getElementById('btnNextRound')
const matchHistoryBox = document.getElementById('matchHistory')
const playerHistoryBox = document.getElementById('playerList')
const resetBtn = document.getElementById('btnReset')
const token = localStorage.getItem('token')
if (!token || token === 'undefined'){
    window.location.href = '/login.html'
}

function renderPlayer(player) {
    return `
        <li class="player-item">
            <span>${player.name}</span>
            <span class="level-badge">Level ${player.level} | Set ${player.playedCount}</span>
        </li>
    `
}

function renderPlayerList(players){
    return `
        <li class="player-item">
            <span>${players.name}</span>
            <div class="player-badges">
                <span class="level-badge">Lv ${players.level}</span>
                <span class="level-badge">Set ${players.playedCount}</span>
                <button class="btn-remove" data-name="${players.name}">✕</button>
            </div>
        </li>
    `
}

function renderCourt(courtName, court){
    const teamA_HTML = renderTeam("Team A", court.team_A)
    const teamB_HTML = renderTeam("Team B", court.team_B)

    return `<div class="court">
                <h3>${courtName}</h3>
                ${teamA_HTML}
                ${teamB_HTML}
            </div>`
}

function renderTeam(teamName, players){
    const playersHTML = players.map(renderPlayer).join('')
    return `<div class="team">
                <h3>${teamName}</h3>
                <ul class="player-list">${playersHTML}</ul>
            </div>`
}

function renderMatch(match){
    return `<div class="match-card">
                <h2>Hiệp: ${match.set}</h2>
                <div class="court-container">
                    ${renderCourt('Sân 1', match.court_1)}
                    ${renderCourt('Sân 2', match.court_2)}
                </div>
            </div>`
}

function renderMatchHistory(matchHistory){
    matchHistoryBox.innerHTML = matchHistory.map(renderMatch).join('')
}

function renderPlayerHistory(players){
    playerHistoryBox.innerHTML = players.map(renderPlayerList).join('')
}

const addPlayerBtn = document.getElementById('btnAddPlayer')
const inputName = document.getElementById('inputName')
const selectLevel = document.getElementById('selectLevel')

addPlayerBtn.addEventListener('click', () => {
    const name = inputName.value.trim()
    const level = selectLevel.value

    if (!name || !level) return

    fetch('/api/players', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
         },
        body: JSON.stringify({ name, level: Number(level) })
    })
        .then(res => res.json())
        .then(data => {
            renderPlayerHistory(data.players)
            inputName.value = ''
            selectLevel.value = ''
        })
})

document.getElementById('playerList').addEventListener('click', (e) => {
    if (!e.target.classList.contains('btn-remove')) return
    const name = e.target.dataset.name
    fetch(`/api/players/${encodeURIComponent(name)}`, { 
        headers: {authorization: `Bearer ${token}`},
        method: 'DELETE' })
        .then(res => res.json())
        .then(data => renderPlayerHistory(data.players))
})

document.getElementById('btnRandom').addEventListener('click', () => {
    fetch('/api/players/random', {
        headers: {authorization: `Bearer ${token}`},
        method: 'POST'})
        .then(res => res.json())
        .then(data => renderPlayerHistory(data.players))
})

document.getElementById('btnLogout').addEventListener('click', () => {
    localStorage.removeItem('token')
    window.location.href = '/login.html'
})

arrangeBtn.addEventListener('click', () => {
    fetch('/api/match-history', {
        headers: {authorization: `Bearer ${token}`},
    })
        .then(Response => {
            return Response.json()
        })
        .then(data => {
            // console.log(data)
            // console.log(data.matchHistory)
            // console.log(data.players)
            renderMatchHistory(data.matchHistory)
            renderPlayerHistory(data.players)
        })
});

resetBtn.addEventListener('click', () => {
    fetch('/api/reset', {
        headers: {authorization: `Bearer ${token}`},
    })
        .then(Response => {
            return Response.json()
        })
        .then(data => {
            renderMatchHistory(data.matchHistory)
            renderPlayerHistory(data.players)
            console.log(renderMatchHistory(data.matchHistory[0]))
            // console.log(renderPlayer(data.players))
            // console.log(data)
        })
})