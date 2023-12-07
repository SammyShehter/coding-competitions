const fs = require('fs');
const x = fs.readFileSync('input1.txt').toString().split('\n').map(item => {
    const [hand, bid] = item.split(' ')
    return {hand, bid}
})

function sortByWinning(arrayOfHnB) {
    const sorted = []
    arrayOfHnB
}

console.log(x)