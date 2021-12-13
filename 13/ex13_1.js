const fs = require("fs");
const [points, folds] = fs.readFileSync('input.txt', 'utf8').split("\n\n").map(s => s.split("\n").filter(s => s !== ""))

let pointMap = {}
points.forEach(p => {
    pointMap[p] = p.split(",").map(n => parseInt(n))
})

const f = folds[0]
const [z, axis, val] = f.match(/fold along ([xy])=(\d+)/)
const pos = parseInt(val)
const newPointMap = Object.keys(pointMap).reduce((map, point) => {
    let [x, y] = pointMap[point]
    if (axis === "x" && x > pos) {
        x = pos - (x - pos)
    }
    if (axis === "y" && y > pos) {
        y = pos - (y - pos)
    }
    map[`${x},${y}`] = [x, y]
    return map
}, {})


console.log("POINTS", Object.keys(newPointMap).length)
