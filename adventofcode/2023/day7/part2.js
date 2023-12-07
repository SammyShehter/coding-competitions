const fs = require('fs');
const x = fs.readFileSync('input.txt').toString().split('\n').map((data) => +data.split(': ')[1].trim().split(/\D+/).join(''))

const [time, distance] = x
let iteration = time
let winning = 0
while (iteration >= 0) {
    const buttonPress = time - iteration
    const Idistance = buttonPress * (time - buttonPress)
    if (Idistance > distance) {
        winning++
    }
    iteration--
}

console.log(winning)