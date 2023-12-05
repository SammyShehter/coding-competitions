const fs = require('fs');
// NOTE: I did manipulate in the input file
const x = fs.readFileSync('input1.txt').toString().split('\n')
let match = 0
let currentWinning = []
for (let i = 0; i < x.length; i++) {
    const card = x[i]
    const cardNums = card.split(' ')
    if (i % 2) {
        const currentMatch = []
        for (let index = 0; index < cardNums.length; index++) {
            const number = cardNums[index]
            if (currentWinning.includes(number)) currentMatch.push(number)
        }
        currentWinning = []
        if (currentMatch.length === 0) continue
        if (currentMatch.length > 0) {
            match = match + (2 ** (currentMatch.length - 1))
        }
        continue
    } else {
        currentWinning = [...cardNums]
        continue
    }
}

console.log(match)