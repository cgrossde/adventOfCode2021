const fs = require("fs");
const data = fs.readFileSync('input.txt', 'utf8');

const horizontalPositions = data.split(",").map(n => parseInt(n))
let minH = horizontalPositions[0]
let maxH = 0
horizontalPositions.forEach(n => {
    minH = (minH > n) ? n : minH
    maxH = (maxH < n) ? n : maxH
})

function fuelCosts(targetPosition) {
    return horizontalPositions.reduce((totalFuelCosts, position) => {
        const distance = Math.abs(position - targetPosition);
        const gaussSum = (distance*(distance + 1))/2
        return totalFuelCosts + gaussSum;
    }, 0);
}

function bruteForceOptimumFuelCosts() {
    let minFuel;
    let optimalH;
    for(let h = minH; h <= maxH; h++) {
        const fuelUsed = fuelCosts(h);
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


