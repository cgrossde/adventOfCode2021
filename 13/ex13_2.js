const fs = require("fs");
const [points, folds] = fs.readFileSync('input.txt', 'utf8').split("\n\n").map(s => s.split("\n").filter(s => s !== ""))

let pointMap = {}
points.forEach(p => {
    pointMap[p] = p.split(",").map(n => parseInt(n))
})

let lastX, lastY;
folds.forEach(f => {
    const [z, axis, val] = f.match(/fold along ([xy])=(\d+)/)
    const pos = parseInt(val)
    lastX = (axis === "x") ? pos : lastX
    lastY = (axis === "y") ? pos : lastY
    pointMap = Object.keys(pointMap).reduce((map, point) => {
        let [x,y] = pointMap[point]
        if (axis === "x" && x > pos) {
            x = pos - (x - pos)
        }
        if (axis === "y" && y > pos) {
            y = pos - (y - pos)
        }
        map[`${x},${y}`] = [x,y]
        return map
    }, {})
})

print(pointMap, lastX, lastY)


function print(pointMap, maxX,  maxY) {
    for (let y = 0; y < maxY; y++) {
        for (let x = 0; x < maxX; x++) {
            const char = (pointMap[`${x},${y}`]) ? '#' : '.'
            process.stdout.write(char)
        }
        process.stdout.write("\n")
    }
}




