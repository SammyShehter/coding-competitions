const fs = require('fs');
// NOTE: I did manipulate in the input file
const x = fs.readFileSync('input.txt').toString().split('\n')
const atempts = []
const wins = []

for (let index = 0; index < x.length; index++) {
    if (index % 2) {
        atempts.push(x[index].split(' ').map(Number))
        continue
    } else {
        wins.push(x[index].split(' ').map(Number))
        continue
    }
}

const copies = new Array(atempts.length).fill(1)

for (let i = 0; i < atempts.length; i++) {
    const atempt = atempts[i]
    const win = wins[i]
    const matchesCount = atempt.filter(num => win.includes(num)).length
    if (matchesCount) {
        for (let j = i + 1; j <= matchesCount + i; j++) {
            copies[j] += copies[i]
        }
    }
}

console.log(copies.reduce((acc, curr) => acc + curr))