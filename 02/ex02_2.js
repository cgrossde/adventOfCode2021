const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8');

let horizontalPos = 0;
let depth = 0;
let aim = 0;
// Preprocessing
const commands = data.split(/\n/).map(s => {
    const parts = s.split(" ");
    return {
        cmd: parts[0],
        value: parseInt(parts[1])
    };
})
// Calc
commands.forEach((command) => {
    switch (command.cmd) {
        case "forward":
            horizontalPos += command.value
            depth += aim * command.value
            break
        case "up":
            aim -= command.value
            break
        case "down":
            aim += command.value
            break
        default:
            console.error("Unkown cmd", command);
    }
});

console.log(`horizontal=${horizontalPos}, depth=${depth}, result=${horizontalPos*depth}`);


