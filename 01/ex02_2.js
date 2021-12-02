const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8');

const values = data.split(/\n/).map(s => parseInt(s));

let increaseCount = 0;
for (let i = 0; i < values.length - 3; i++) {
    const firstWindow = values[i] + values[i + 1] + values[i + 2];
    const secondWindow = values[i + 1] + values[i + 2] + values[i + 3];
    if (firstWindow < secondWindow)
        increaseCount++;
}
console.log('Count', increaseCount);


