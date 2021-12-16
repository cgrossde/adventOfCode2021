const fs = require("fs");
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

function react(input, reactionRegexes) {
    const matches = reactionRegexes.reduce((matches, reaction) => {
        [...input.matchAll(reaction.regex)]
            .forEach(match => {
                matches.push({index: match.index + 1, value: reaction.value})
                // Special case because /BB/ matches BBB only once instead of twice
                if (reaction.doubleChar && input[match.index+2] === reaction.doubleChar) {
                    matches.push({index: match.index + 2, value: reaction.value})
                }
            })
        return matches
    }, [])
        .sort((a,b) => a.index - b.index) // sort to process from left to right

    return matches.reduce((output, match, offset) => {
        return output.slice(0, match.index + offset) + match.value + output.slice(match.index + offset)
    }, input)
}

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









