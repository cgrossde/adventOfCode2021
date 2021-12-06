const fs = require("fs");
const data = fs.readFileSync('input.txt', 'utf8');

class LanternFish {
    constructor(daysTillRepro = 8) {
        this.daysTillRepro = daysTillRepro
    }

    liveDay(fishPopulation) {
        this.daysTillRepro--
        if (this.daysTillRepro < 0) {
            this.daysTillRepro = 6
            fishPopulation.push(new LanternFish())
        }
    }
}

const SIMULATION_DAYS = 80
const fishPopulation = data.split(",").filter(f => f !== "").map(f => new LanternFish(f))

console.log("Initial population: " + fishPopulation.map(f => f.daysTillRepro).join(","))

for(let d = 1; d <= SIMULATION_DAYS; d++) {
    fishPopulation.forEach(fish => fish.liveDay(fishPopulation))
    //console.log(`After day ${d}: ${fishPopulation.map(f => f.daysTillRepro).join(",")}`)
}

// 383160
console.log("Total population: " + fishPopulation.length)


