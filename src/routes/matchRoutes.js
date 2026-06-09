const {players, matchHistory} = require('../data/players.js')
const {addNewRound} = require('../services/matchService.js')

const express = require('express')
const router = express.Router()

router.get('/match-history', (req,res) => {
    addNewRound();
    res.json({
        matchHistory: matchHistory, 
        players: players    
    })
})

router.get('/reset', (req, res) => {
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

module.exports = router