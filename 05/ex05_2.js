const fs = require("fs");
const { createImageData, createCanvas } = require('canvas')

const data = fs.readFileSync('input.txt', 'utf8');
const HORIZONTAL = 'h', VERTICAL = 'v', DIAGONAL = 'd'

const lines = data.split(/\n/)
    .filter(line => line !== "")
    .map(line => {
        const points = line.split(" -> ")
        const [x1, y1] = points[0].split(",").map(n => parseInt(n))
        const [x2, y2] = points[1].split(",").map(n => parseInt(n))
        const dir = (x1 - x2 === 0) ? VERTICAL : (y1 - y2 === 0) ? HORIZONTAL : DIAGONAL
        return {
            p1: [(dir === HORIZONTAL) ? Math.min(x1, x2) : x1, (dir === VERTICAL) ? Math.min(y1, y2) : y1],
            p2: [(dir === HORIZONTAL) ? Math.max(x1, x2) : x2, (dir === VERTICAL) ? Math.max(y1, y2) : y2],
            dir: dir
        }
    })

let xMax = 1000, yMax = 1000, map = []
let overlapCounter = 0

lines.forEach(line => {
    if (line.dir === HORIZONTAL) {
        const y = line.p1[1];
        for (let x = line.p1[0]; x <= line.p2[0]; x++) {
            map[x] = map[x] || []
            map[x][y] = ++map[x][y] || 1
            if (map[x][y] == 2)
                overlapCounter++
        }
    }
    else if (line.dir === VERTICAL) {
        const x = line.p1[0];
        map[x] = map[x] || []
        for (let y = line.p1[1]; y <= line.p2[1]; y++) {
            map[x][y] = ++map[x][y] || 1
            if (map[x][y] == 2)
                overlapCounter++
        }
    }
    else if (line.dir === DIAGONAL) {
        const [x1,y1] = line.p1
        const [x2,y2] = line.p2
        const xDir = (x2 - x1 > 0) ? 1 : -1
        const yDir = (y2 - y1 > 0) ? 1 : -1
        const distance = Math.abs(x1-x2)
        for(let i = 0; i <= distance; i++) {
            const [x,y] = [x1+i*xDir,y1+i*yDir]
            map[x] = map[x] || []
            map[x][y] = ++map[x][y] || 1
            if (map[x][y] == 2)
                overlapCounter++
        }
    }
})
// 19771
console.log("OVERLAP POINTS: ", overlapCounter)

function toImage(map) {
    const canvas = createCanvas(xMax, yMax)
    const ctx = canvas.getContext('2d');
    const imageData = createImageData(xMax, yMax)
    Object.keys(map).forEach(x => {
        Object.keys(map[x]).forEach(y => {
            const pos = 4 * (parseInt(y)*yMax + parseInt(x));
            imageData.data[pos] = Math.min(50+50*map[x][y], 255)    // R
            imageData.data[pos+1] = 30  // G
            imageData.data[pos+2] = 30  // B
            imageData.data[pos+3] = 255  // A
        })
    })
    ctx.putImageData(imageData, 0, 0)
    const out = fs.createWriteStream(__dirname + '/map.png')
    const stream = canvas.createPNGStream()
    stream.pipe(out)
    out.on('finish', () =>  console.log('The PNG map was created.'))
}

function prettyPrint(map) {
    for(let y = 0; y < yMax; y++) {
        for(let x = 0; x < xMax; x++) {
            if(map[x] && map[x][y])
                process.stdout.write(map[x][y].toString())
            else
                process.stdout.write(".")
        }
        process.stdout.write("\n")
    }
}

toImage(map)
//prettyPrint(map)
