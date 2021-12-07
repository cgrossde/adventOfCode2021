const fs = require("fs");
const data = fs.readFileSync('input.txt', 'utf8');

const horizontalPositions = data.split(",").map(n => parseInt(n))
let minH = horizontalPositions[0]
let maxH = 0
horizontalPositions.forEach(n => {
    minH = (minH > n) ? n : minH
    maxH = (maxH < n) ? n : maxH
})

function bruteForceOptimumFuelCosts() {
    let minFuel;
    let optimalH;
    for(let h = minH; h <= maxH; h++) {
        const fuelUsed = horizontalPositions.reduce((sum, position) => sum + Math.abs(position - h), 0)
        if ((!minFuel || minFuel > fuelUsed)) {
            minFuel = fuelUsed
            optimalH = h
        }
    }
    return {
        minFuel,
        optimalH
    }
}

console.log(bruteForceOptimumFuelCosts())


