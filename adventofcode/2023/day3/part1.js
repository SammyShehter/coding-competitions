const fs = require('fs');
const x = fs.readFileSync('input.txt').toString().split('\n')

const matrix = []
const result = []
let startNumber = ''
let legit = false
x.forEach(item => matrix.push(item.split('')))

function isSymbol(char) {
    if (!char) return
    if (!Number.isNaN(+char)) return
    if (char === '.') return
    return true
}

function isLegit(index, line, prevLine, nextLine) {

    const checks = [
        isSymbol(line[index - 1]),
        isSymbol(line[index + 1]),
        prevLine ? isSymbol(prevLine[index]) : null,
        prevLine ? isSymbol(prevLine[index - 1]) : null,
        prevLine ? isSymbol(prevLine[index + 1]) : null,
        nextLine ? isSymbol(nextLine[index]) : null,
        nextLine ? isSymbol(nextLine[index - 1]) : null,
        nextLine ? isSymbol(nextLine[index + 1]) : null,
    ]

    return checks.find(Boolean)
}

for (let i = 0; i < matrix.length; i++) {
    const line = matrix[i];

    for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (Number.isNaN(+char)) {
            if (startNumber && legit) {
                result.push(+startNumber)
                startNumber = ''
                legit = false
                continue
            }
            startNumber = ''
            continue
        }

        startNumber += char
        if (isLegit(j, line, matrix[i - 1], matrix[i + 1])) {
            legit = true
        }

    }


}

console.log(result.reduce((acc, curr) => acc + curr))