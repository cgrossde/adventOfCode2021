const fs = require("fs");

class Octopus {
    constructor(x, y, energy) {
        this.x = x;
        this.y = y;
        this.energy = energy;
        this.flashed = false;
    }

    getNeighbours() {
        const neighbours = []
        const left = this.x > 0;
        const down = this.y < map.length - 1;
        const up = this.y > 0;
        const right = this.x < map[this.y].length - 1;
        if (left) {
            neighbours.push(map[this.y][this.x - 1])
            if (up)
                neighbours.push(map[this.y - 1][this.x - 1])
            if (down)
                neighbours.push(map[this.y + 1][this.x - 1])
        }
        if (right) {
            neighbours.push(map[this.y][this.x + 1])
            if (up)
                neighbours.push(map[this.y - 1][this.x + 1])
            if (down)
                neighbours.push(map[this.y + 1][this.x + 1])
        }
        if (down)
            neighbours.push(map[this.y + 1][this.x])
        if (up)
            neighbours.push(map[this.y - 1][this.x])
        return neighbours
    }

    increaseEnergyLevelAndFlash() {
        this.energy++
        if (this.energy > 9 && !this.flashed) {
            return this.flash()
        }
        return []
    }

    flash() {
        this.flashed = true
        return this.getNeighbours().reduce((flashedOctos, currentOcto) => {
            return flashedOctos.concat(currentOcto.increaseEnergyLevelAndFlash())
        },[this])
    }

    reset() {
        this.energy = 0
        this.flashed = false
    }
}

const map = fs.readFileSync('input.txt', 'utf8')
    .split("\n").filter(f => f !== "")
    .map((line, y) => {
        return line.split("").map((val, x) => new Octopus(x, y, parseInt(val)));
    });

function print(s) {
    console.log("STEP " + s)
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            process.stdout.write(" " +map[y][x].energy.toString())
        }
        process.stdout.write("\n")
    }
}

function findFirstSyncFlash() {
    let steps = 1;
    const allOctopi = map.flat()
    while(true) {
        const flashedOcti = []
        allOctopi.forEach(octo => {
            flashedOcti.push(...octo.increaseEnergyLevelAndFlash())
        })
        if (flashedOcti.length === 100)
            return steps
        flashedOcti.forEach(octo => octo.reset())
        steps++
    }
}

console.log("STEPS:", findFirstSyncFlash())



