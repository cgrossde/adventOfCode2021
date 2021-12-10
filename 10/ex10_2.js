const fs = require("fs");
const lines = fs.readFileSync('input.txt', 'utf8')
    .split("\n").filter(f => f !== "")

const OPENING_BRACKET = /[<({\[]/
const CLOSING_BRACKET = /[>)}\]]/
const MAP = {
    "{": "}",
    "(": ")",
    "[": "]",
    "<": ">",
}
const SCORING = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
}

const lineScores = []
lines.forEach(line => {
    const expectedBrackets = []
    const brackets = line.split("");
    let corrupted = false
    for(let i = 0; i < brackets.length; i++) {
        const bracket = brackets[i]
        if (bracket.match(OPENING_BRACKET)) {
            expectedBrackets.push(MAP[bracket])
        } else if (bracket.match(CLOSING_BRACKET)) {
            const expectedClosingBracket = expectedBrackets.pop();
            if (expectedClosingBracket !== bracket) {
                corrupted = true
                break
            }
        }
    }
    if (!corrupted) {
        const lineScore = expectedBrackets.reverse().reduce((sum, bracket) => {
            return 5 * sum + SCORING[bracket]
        }, 0)
        lineScores.push(lineScore)
    }
})

// Sort and pick middle
lineScores.sort((a,b) => a-b)
console.log("SCORE: " + lineScores[(lineScores.length -1)/2])



