const fs = require("fs");
const data = fs.readFileSync('input.txt', 'utf8').split("\n").filter(f => f !== "");

const digits = data.reduce((sum, d) => {
    let [patterns, digits] = d.split(" | ").map(val => val.split(" ").map(e => e.split("")))
    return sum + count1478(digits, d)
}, 0)

function count1478(digits, d) {
    let count = 0
    digits.forEach(d => {
        switch (d.length) {
            case 2: // one
            case 3: // seven
            case 4: // four
            case 7: // eight
                count++;
                break
        }
    })
    return count
}
console.log(digits)


