const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8');

let lastMeasurement;
let increaseCount = 0;
const values = data.split(/\n/).map(s => parseInt(s))
values.forEach((measurement) => {
    if (measurement > lastMeasurement)
        increaseCount++;
    lastMeasurement = measurement;
});

console.log('Count', increaseCount);


