const fs = require('fs');
const x = fs.readFileSync('input.txt').toString().split('\n')

const matrix = []
const result = []
x.forEach(item => matrix.push(item.split('')))
let pointer = null
function legitNumber(legitToTheRight, legitToTheLeft, number, index, line) {
    if (legitToTheLeft && legitToTheRight) return number

    if (!legitToTheRight) {
        pointer != null ? pointer += 1 : pointer = index + 1
        const potentialNumber = line[pointer]
        if (Number.isNaN(+potentialNumber)) {
            pointer = null
            return legitNumber(true, legitToTheLeft, number, index, line)
        }
        number = number + potentialNumber
        return legitNumber(false, legitToTheLeft, number, index, line)
    }

    if (!legitToTheLeft) {
        pointer != null ? pointer -= 1 : pointer = index - 1
        const potentialNumber = line[pointer]
        if (Number.isNaN(+potentialNumber)) {
            pointer = null
            return legitNumber(legitToTheRight, true, number, index, line)
        }
        number = potentialNumber + number
        return legitNumber(legitToTheRight, false, number, index, line)
    }
}

function calculatePower(index, line, prevLine, nextLine) {
    const checks = [
        [
            prevLine && !Number.isNaN(+prevLine[index - 1]) ? {
                number: prevLine[index - 1],
                index: index - 1,
                line: prevLine
            } : null,
            prevLine && !Number.isNaN(+prevLine[index]) ? {
                number: prevLine[index],
                index: index,
                line: prevLine
            } : null,
            prevLine && !Number.isNaN(+prevLine[index + 1]) ? {
                number: prevLine[index + 1],
                index: index + 1,
                line: prevLine
            } : null,
        ], [
            !Number.isNaN(+line[index - 1]) ? {
                number: line[index - 1],
                index: index - 1,
                line: line
            } : null
        ], [
            !Number.isNaN(+line[index + 1]) ? {
                number: line[index + 1],
                index: index + 1,
                line: line
            } : null
        ], [
            nextLine && !Number.isNaN(+nextLine[index - 1]) ? {
                number: nextLine[index - 1],
                index: index - 1,
                line: nextLine
            } : null,
            nextLine && !Number.isNaN(+nextLine[index]) ? {
                number: nextLine[index],
                index: index,
                line: nextLine
            } : null,
            nextLine && !Number.isNaN(+nextLine[index + 1]) ? {
                number: nextLine[index + 1],
                index: index + 1,
                line: nextLine
            } : null
        ]

    ].filter(item => item.find(Boolean))

    const check1 = checks[0].find(Boolean)
    const check2 = checks.length > 1 && checks.slice(-1)[0].find(Boolean)

    if (!check1 || !check2) return 0

    let fistNum = legitNumber(false, false, check1.number, check1.index, check1.line)
    let lastNum = legitNumber(false, false, check2.number, check2.index, check2.line)

    return +fistNum * +lastNum
}

for (let i = 0; i < matrix.length; i++) {
    const line = matrix[i];

    for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (char !== "*") continue
        const power = calculatePower(j, line, matrix[i - 1], matrix[i + 1])
        if (!power) continue
        result.push(power)
    }
}

console.log(result.reduce((acc, curr) => acc + curr))