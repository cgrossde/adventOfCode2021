const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8');
const lines = data.split(/\n/)
const bingoNumbers = lines.shift().split(",")
const bingoFields = []

class BingoField {
    constructor(numbers) {
        this.numberMap = this.fillNumberMap(numbers)
        this.bingo = { c0: 0, c1: 0, c2: 0, c3: 0, c4: 0, l0:0, l1: 0, l2: 0, l3: 0, l4: 0}
        this.bingoScored = false
    }

    fillNumberMap(numbers) {
        const numberMap = {}
        numbers.forEach((line, lineIndex) => {
            line.forEach((number, colIndex) => {
                numberMap[number] = {
                    col: colIndex,
                    line: lineIndex,
                    matched: false
                }
            })
        })
        return numberMap;
    }

    checkNumber(number) {
        const boardField = this.numberMap[number]
        if (!boardField || boardField.matched || this.bingoScored)
            return false;

        boardField.matched = true
        this.bingo[`l${boardField.line}`]++
        this.bingo[`c${boardField.col}`]++
        if (this.bingo[`c${boardField.col}`] === 5 || this.bingo[`l${boardField.line}`] === 5) {
            this.bingoScored = parseInt(number) * this.getSumUnmatchedNumbers();
            return this.bingoScored
        }
    }

    getSumUnmatchedNumbers() {
        return Object.keys(this.numberMap)
            .filter(n => !this.numberMap[n].matched)
            .map(n => parseInt(n))
            .reduce((sum, n) => sum + n, 0)
    }
}

// Init fields
for(let i = 1; i < lines.length; i+=6) {
    bingoFields.push(new BingoField(lines.slice(i, i + 5).map(l => l.trim().split(/\s+/))));
}

// Play
bingoNumbers.forEach(draw => {
    bingoFields.forEach(field => {
        const bingo = field.checkNumber(draw)
        if (bingo) {
            console.log("BINGO! " + bingo)
            process.exit(0)
        }
    })
})
