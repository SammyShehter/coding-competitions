const fs = require('fs');
const seeds = fs.readFileSync('seeds.txt').toString().split(' ').map(Number)
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

        let seed = seeds[i];

        for (let j = 0; j < dataArray.length; j++) {
            const data = dataArray[j]
            for (let x = 0; x < data.length; x++) {
                const [dest, source, times] = data[x].map(Number);
                const upperBound = source + times - 1
                if (seed > upperBound) continue
                if (seed >= source && seed <= upperBound) {
                    seed = dest + (seed - source)
                    break
                }
            }
        }
        
        if(seed < answer) answer = seed

    }
    return answer
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