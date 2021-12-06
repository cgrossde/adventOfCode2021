const fs = require("fs");
const data = fs.readFileSync('input.txt', 'utf8');

const newFishInDays = [
    0, // Tomorrow
    0, // 2 days
    0, // 3 days
    0, // 4 days
    0, // 5 days
    0, // 6 days
    0, // 7 days
    0, // 8 days
    0 // 9 Days
]

// Populate growth simulation array
data.split(",").filter(f => f !== "").forEach(f => newFishInDays[parseInt(f)]++)

const OLD_FISH_REPRO_DAYS = 6

function liveDay() {
    const fishReproducingToday = newFishInDays.shift()
    newFishInDays[OLD_FISH_REPRO_DAYS] += fishReproducingToday
    newFishInDays.push(fishReproducingToday) // New fish reproRate = 8 days => end of array
}

function countPopulation() {
    return newFishInDays.reduce((sum, fish) => sum + fish, 0)
}

const SIMULATION_DAYS = 256
console.log("Initial population: " + countPopulation())

for(let d = 1; d <= SIMULATION_DAYS; d++) {
    liveDay()
    //console.log(`After day ${d}: ${countPopulation()}`)
}

console.log("Total population: " + newFishInDays.reduce((sum, fish) => sum + fish, 0))



