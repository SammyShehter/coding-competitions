const fs = require('fs');

const x = fs.readFileSync('input.txt').toString().split('\n')

const lettersToNumbers = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9'
}

function makeSeder(input) {
    const testArray = []

    for (let word in lettersToNumbers) {
        let regex = new RegExp(word, 'gi');

        while ((match = regex.exec(input)) !== null) {
            testArray[match.index] = lettersToNumbers[word];
        }
    }

    for (const [index, letter] of input.split('').entries()) {
        if (Number.isNaN(+letter)) continue
        testArray[index] = letter
    }

    return testArray.filter(Boolean)
}


function getNums(x) {
    const result = []

    x.forEach(str => {
        const correctOreder = makeSeder(str)
        result.push(+(correctOreder[0] + correctOreder.slice(-1)))
    })

    return result.reduce((acc, curr) => acc + curr)
}

console.log(getNums(x))