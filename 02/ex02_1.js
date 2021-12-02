const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8');

let horizontalPos = 0;
let depth = 0;
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
            break
        case "up":
            depth -= command.value
            break
        case "down":
            depth += command.value
            break
        default:
            console.error("Unkown cmd", command);
    }
});

console.log(`x=${horizontalPos}, z=${depth}, result=${horizontalPos*depth}`);


