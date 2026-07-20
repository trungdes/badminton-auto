const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()

const matchRoute = require('./src/routes/matchRoutes.js')
const authRoute = require('./src/routes/authRoutes.js')

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.static(path.join(__dirname, 'client', 'dist')));
app.use('/api', matchRoute)
app.use('/api/auth', authRoute)

app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});