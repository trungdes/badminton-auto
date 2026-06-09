const {players} = require('src\data\players.js')
const {addNewRound} = require('src\services\matchService.js')

app.get('/match-history', (req,res) => {
    addNewRound();
    res.json({
        matchHistory: matchHistory, 
        players: players    
    })
})

app.get('/reset', (req, res) => {
    matchHistory.length = 0
    players.forEach(p => {
        p.playedCount = 0
    }
    )
    res.json({
        matchHistory: matchHistory,
        players: players
    })
})
