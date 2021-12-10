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
    "}": 1197,
    ")": 3,
    "]": 57,
    ">": 25137,
}
const corruptedBrackets = []
lines.forEach(line => {
    const expectedBrackets = []
    line.split("").forEach(bracket => {
        if (bracket.match(OPENING_BRACKET)) {
            expectedBrackets.push(MAP[bracket])
        } else if (bracket.match(CLOSING_BRACKET)) {
            if (expectedBrackets.pop() !== bracket)
                corruptedBrackets.push(bracket)
        } else {
            throw Error("Unkown bracket: " + bracket)
        }
    })
})

console.log("SCORE: " + corruptedBrackets.reduce((sum, bracket) => {
    return sum + SCORING[bracket]
}, 0))



