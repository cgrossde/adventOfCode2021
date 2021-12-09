const fs = require("fs");
const heightData = fs.readFileSync('input.txt', 'utf8')
    .split("\n").filter(f => f !== "")
    .map(line => line.split("").map(s => parseInt(s)));

const lowPoints = []

for(let y = 0; y < heightData.length; y++) {
    for(let x = 0; x < heightData[y].length; x++) {
        const currentHeight = heightData[y][x]
        const right = (x < heightData[y].length -1) ? heightData[y][x+1] : 9
        if (currentHeight >= right)
            continue
        const up = (y > 0) ? heightData[y-1][x] : 9
        const down = (y < heightData.length -1) ? heightData[y+1][x] : 9
        const left = (x > 0) ? heightData[y][x-1] : 9
        if (currentHeight < up && currentHeight < down && currentHeight < left)
            lowPoints.push(currentHeight)
    }
}

const risk = lowPoints.reduce((sum, height) => sum + height + 1, 0)

console.log("RISK:", risk)



