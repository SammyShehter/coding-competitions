const fs = require('fs');
// NOTE: I did change ; to , in the input file
const x = fs.readFileSync('input.txt').toString().split('\n')

const cubesPower = []

for (let i = 0; i < x.length; i++) {
    const cube = x[i];
    const gamesArray = cube.split(', ')
    const colors = {
        red: 0,
        green: 0,
        blue: 0
    }
    for (let j = 0; j < gamesArray.length; j++) {
        const game = gamesArray[j];
        const gameArray = game.split(' ')
        const number = +gameArray[0]
        const color = gameArray[1]
        if (colors[color] >= number) {
            continue
        } else {
            colors[color] = number
        }
    }

    cubesPower.push(colors.red * colors.blue * colors.green)
}

console.log(cubesPower.reduce((acc, curr) => acc + curr))