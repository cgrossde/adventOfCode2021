const fs = require("fs");

// INCOMPLETE: Idea is to recursively react from left to right:
// Start with the first pair and react it down to the limit. Then continue on

const [input, reactions] = fs.readFileSync('example-input.txt', 'utf8')
    .split("\n\n")
    .map(s => {
        if (!s.match(/->/)) // Input
            return s
        return s.split("\n") // Reactions
            .filter(s => s !== "")
            .map(r => {
                const [exp, value] = r.split(" -> ")
                return {
                    regex: new RegExp(exp, 'g'),
                    value,
                    doubleChar: (exp[0]===exp[1]) ? exp[0] : undefined
                }
            })
    })



const LIMIT = 2
const CACHE = {}
const add = (resA, resB) => {
    let res = {...resA}
    Object.entries(resB).forEach(([key, value]) => {
        res[key] = (res[key] || 0) + value
    })
    return res
}
function react(current, depth = 1) {
    if (CACHE[current + depth])
        return CACHE[current + depth]
    const find = reactions.find(r => current.slice(current.length - 2).match(r.regex));
    let result = {}
    if(find) {
        if (depth === LIMIT) {
            result[current[0]] = 1;
            result[find.value] = 1;
        }
        else {
            result = add(react(current[0] + find.value, depth + 1), react(find.value + current[1], depth + 1))
        }
    } else {
        result[current[0]] = 1;
        result[current[1]] = 1;
    }
    return result
}

const resA = react("NN")
const resB = react("NC")
const resC = react("CB")
const resD = {B: 1}
// NBCCNBBBCBHCB
// N: 2, B: 6, C: 4, H: 1
// {N: 2, B: 5, C: 3, H: 1}
console.log(add(resA, add(resB, add(resC, resD))))
process.exit()
const STEPS = 40
let polymer = input
for(let i = 1; i <= STEPS ; i++) {
    polymer = react(polymer, reactions);
    process.stdout.write(".")
}
const frequency = polymer.split("")
    .reduce((result, element) => {
    result[element] = ++result[element] || 1
    return result
}, {})

const frequencySorted = Object.values(frequency)
    .sort((a,b) => a - b)

console.log(frequencySorted)
console.log("RESULT: " + (frequencySorted[frequencySorted.length - 1] - frequencySorted[0]))









