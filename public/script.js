const arrangeBtn = document.getElementById('btnNextRound')
        const matchHistoryBox = document.getElementById('matchHistory')
        const playerHistoryBox = document.getElementById('playerList')
        const resetBtn = document.getElementById('btnReset')

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
                    <span class="level-badge">${players.level}</span>
                    <span class="level-badge">${players.playedCount}</span>
                </li>
            `
        }

        function renderCourt(courtName, players){
            const playersHTML = players.map(renderPlayer).join('')
            return `<div class="court">
                        <h3>${courtName}</h3>
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

        arrangeBtn.addEventListener('click', () => {
            fetch('/api/match-history')
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
            fetch('/api/reset')
                .then(Response => {
                    return Response.json()
                })
                .then(data => {
                    renderMatchHistory(data.matchHistory)
                    renderPlayerHistory(data.players)
                    // console.log(renderMatchHistory(data.matchHistory))
                    // console.log(renderPlayer(data.players))
                    // console.log(data)
                })
        })