const fs = require('fs');
// NOTE: I did change ; to , in the input file
const x = fs.readFileSync('input.txt').toString().split('\n')

const possibleGames = []
const limits = {
    red: 12,
    green: 13,
    blue: 14
}

for (let i = 0; i < x.length; i++) {
    const cube = x[i];
    const gamesArray = cube.split(', ')
    let notGood = false
    for (let j = 0; j < gamesArray.length; j++) {
        const game = gamesArray[j];
        const gameArray = game.split(' ')
        const number = +gameArray[0]
        const color = gameArray[1]

        if (limits[color] >= number) {
            continue
        } else {
            notGood = true
            break
        }
    }
    if (notGood) continue
    possibleGames.push(i + 1)
}

console.log(possibleGames.reduce((acc, curr) => acc + curr))