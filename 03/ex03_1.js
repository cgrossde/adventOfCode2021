const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8');

const invertedMatrix = []
// Preprocessing
data.split(/\n/).forEach(line => {
    for(let i = 0; i < line.length; i++) {
        if(invertedMatrix[i] === undefined)
            invertedMatrix[i] = [line[i]]
        else
            invertedMatrix[i].push(line[i])
    }
});

const oneMostCommon = (bitArray => bitArray.reduce((sum, val) => sum + parseInt(val), 0) > bitArray.length/2);

let gamma = "";
let epsilon = "";
for(let j = 0; j < invertedMatrix.length; j++) {
    const is1MostCommon = oneMostCommon(invertedMatrix[j]);
    gamma += is1MostCommon ? "1" : "0"
    epsilon += is1MostCommon ? "0" : "1"
}
const gammaInt = parseInt(gamma, 2);
const epsilonInt = parseInt(epsilon, 2)

// gamma=011101111100, gammaInt=1916, epsilon=100010000011, epsilonInt=2179, level=4174964
console.log(`gamma=${gamma}, gammaInt=${gammaInt}, epsilon=${epsilon}, epsilonInt=${epsilonInt}, level=${gammaInt*epsilonInt}`);
