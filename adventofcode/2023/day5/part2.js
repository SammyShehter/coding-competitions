const fs = require('fs');
const seedsRaw = fs.readFileSync('seeds.txt').toString().split(' ').map(Number)
const seedToSoil = fs.readFileSync('seed-to-soil.txt').toString().split('\n').map(item => item.split(' '))
const soilToFertilizer = fs.readFileSync('soil-to-fertilizer.txt').toString().split('\n').map(item => item.split(' '))
const fertilizerToWater = fs.readFileSync('fertilizer-to-water.txt').toString().split('\n').map(item => item.split(' '))
const waterToLight = fs.readFileSync('water-to-light.txt').toString().split('\n').map(item => item.split(' '))
const lightToTemperature = fs.readFileSync('light-to-temperature.txt').toString().split('\n').map(item => item.split(' '))
const temperatureToHumidity = fs.readFileSync('temperature-to-humidity.txt').toString().split('\n').map(item => item.split(' '))
const humidityToLocation = fs.readFileSync('humidity-to-location.txt').toString().split('\n').map(item => item.split(' '))

function calculateDestination(seeds, dataArray) {
    let answer = Number.MAX_SAFE_INTEGER
    for (let i = 0; i < seeds.length; i++) {

        let { min, max } = seeds[i];

        for (let j = 0; j < dataArray.length; j++) {
            const data = dataArray[j]

            for (let index = 0; index < data.length; index++) {
                const [dest, source, range] = data[index].map(Number)
                if (min > source || max < source + range - 1) {
                    const vektor = source - dest
                    min = vektor
                } else {
                    break
                }
            }

        }
    }
    return answer
}

const seeds = []
for (let i = 0; i < seedsRaw.length; i += 2) {
    seeds.push({ min: seedsRaw[i], max: seedsRaw[i] + seedsRaw[i + 1] })
}


console.log(
    calculateDestination(seeds, [
        seedToSoil,
        soilToFertilizer,
        fertilizerToWater,
        waterToLight,
        lightToTemperature,
        temperatureToHumidity,
        humidityToLocation
    ])
)