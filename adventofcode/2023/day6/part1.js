const fs = require('fs');
let inputData = []
const x = fs.readFileSync('input.txt').toString().split('\n').map((data) => data.split(': ')[1].trim().split(/\D+/))

for (let i = 0; i < x[0].length; i++) {
    inputData.push({
        time: x[0][i],
        distance: x[1][i]
    })
}
const winningIterations = []
for (const race of inputData) {
    const {time, distance} = race
    let iteration = time
    let winning = 0
    while(iteration >= 0) {
        const buttonPress = time - iteration
        const Idistance = buttonPress * (time - buttonPress)
        if(Idistance > distance) {
            winning++
        }
        iteration--
    }
    winningIterations.push(winning)
}

console.log(winningIterations.reduce((acc, curr) => acc * curr))