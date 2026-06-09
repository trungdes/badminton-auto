const {players} = require('../data/players.js')

//hàm xáo trộn players
function shuffle(array){
    const n = array.length
    for(let i = n - 1; i > 0; i-- ){
        const random = Math.floor(Math.random() * ( i + 1));
        [array[i], array[random]] = [array[random], array[i]]
    }
}
shuffle(players)

