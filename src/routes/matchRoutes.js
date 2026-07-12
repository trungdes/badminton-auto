const {addNewRound} = require('../services/matchService.js')
const authMiddleware = require('../middleware/auth.js')
const Player = require('../models/Player.js')

const express = require('express')
const router = express.Router()

const matchHistories = {}

router.post('/players', authMiddleware , async (req, res) => {
    const {name, level} = req.body
    const player = new Player({name, level, userId: req.userId})
    await player.save()
    const players = await Player.find({userId: req.userId})
    res.json({players})
})

router.post('/players/random', authMiddleware , async (req, res) => {
    await Player.deleteMany({userId: req.userId})

    const randomPlayers = []
    for (let i = 1; i <= 16; i++){
        randomPlayers.push({
            name: 'player_' + i,
            level: Math.floor(Math.random() * 3) + 1,
            playedCount: 0,
            teammates: [],
            userId: req.userId
        })
    }
    await Player.insertMany(randomPlayers)
    const players = await Player.find({userId: req.userId})
    res.json({players})
})

router.delete('/players/:name', authMiddleware , async (req, res) => {
    const {name} = req.params
    await Player.deleteOne({name, userId: req.userId})
    const players = await Player.find({userId: req.userId})
    res.json({players})
})

router.get('/match-history', authMiddleware , async (req,res) => {
    const userId = req.userId
    if(!matchHistories[userId]) matchHistories[userId] = []

    const players = await Player.find({userId}).lean()
    addNewRound(players, matchHistories[userId])

    for(const player of players){
        await Player.updateOne(
            {_id: player._id},
            {playedCount: player.playedCount, teammates: player.teammates}
        )
    }
    res.json({matchHistory: matchHistories[userId], players})
})

router.get('/reset', authMiddleware , async (req, res) => {
    const userId = req.userId
    matchHistories[userId] = []
    await Player.updateMany(
        {userId},
        {playedCount: 0, teammates: []}
    )
    const players = await Player.find({userId})
    res.json({matchHistory: [], players})
})

module.exports = router