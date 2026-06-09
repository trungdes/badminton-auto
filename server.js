const express = require('express')
const matchRoute = require('./src/routes/matchRoutes.js')

const app = express();
const path = require('path')
const PORT = 3000


app.use(express.static('public'));
app.use('/api', matchRoute)


app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});