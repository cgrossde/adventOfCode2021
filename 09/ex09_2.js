const fs = require("fs");

class Point {
    constructor(x,y,height) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.visited = false;
    }

    isBasin() {
        if (this.height >= this.right().height)
            return false
        if (this.height < this.up().height && this.height < this.down().height && this.height < this.left().height)
            return true
        return false
    }

    getBasinSize() {
        let basinSize = 0
        this.visited = true
        const searchList = [this]
        while (searchList.length > 0) {
            const point = searchList.pop()
            if (point.up().isInBasin())
                searchList.push(point.up().visit())
            if (point.right().isInBasin())
                searchList.push(point.right().visit())
            if (point.left().isInBasin())
                searchList.push(point.left().visit())
            if (point.down().isInBasin())
                searchList.push(point.down().visit())
            basinSize++
        }
        return basinSize
    }

    visit() {
        this.visited = true
        return this
    }

    toString() {
        return `(${this.x},${this.y}|${this.height})`
    }

    isInBasin() {
        return this.height < 9 && !this.visited
    }

    left() {
        return (this.x > 0) ? map[this.y][this.x - 1] : HIGH_POINT;
    }

    down() {
        return (this.y < map.length - 1) ? map[this.y + 1][this.x] : HIGH_POINT;
    }

    up() {
        return (this.y > 0) ? map[this.y - 1][this.x] : HIGH_POINT;
    }

    right() {
        return (this.x < map[this.y].length - 1) ? map[this.y][this.x + 1] : HIGH_POINT;
    }
}
const HIGH_POINT = new Point(-1, -1, 9);

const map = fs.readFileSync('input.txt', 'utf8')
    .split("\n").filter(f => f !== "")
    .map((line, y) => {
        return line.split("").map((val,x) => new Point(x,y,parseInt(val)));
    });


function findLocalMinima() {
    const lowPoints = []
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            const currentPoint = map[y][x]
            if (currentPoint.isBasin())
                lowPoints.push(currentPoint)
        }
    }
    return lowPoints;
}

const lowPoints = findLocalMinima();
let basins = lowPoints.map(p => p.getBasinSize()).sort((a,b) => b-a)

console.log("Biggest three multiplied:", basins[0] * basins[1] * basins[2])



