const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8');

function sortByBitAtPos(bitArray, pos) {
    const result = {
        "1": [],
        "0": []
    }
    for(let number of bitArray) {
        if (number[pos] === "1")
            result["1"].push(number)
        else
            result["0"].push(number)
    }
    return result;
}

const allNumbers = data.split(/\n/)

function oxyGeneratorRating(bitArray, pos = 0) {
    if (bitArray.length === 1)
        return bitArray[0]
    const sortedByVal = sortByBitAtPos(bitArray, pos)
    const nextBitArray = sortedByVal["1"].length >= sortedByVal["0"].length ? sortedByVal["1"] : sortedByVal["0"]
    return oxyGeneratorRating(nextBitArray, pos+1)
}

function co2GeneratorRating(bitArray, pos = 0) {
    if (bitArray.length === 1)
        return bitArray[0]
    const sortedByVal = sortByBitAtPos(bitArray, pos)
    const nextBitArray = sortedByVal["1"].length < sortedByVal["0"].length ? sortedByVal["1"] : sortedByVal["0"]
    return co2GeneratorRating(nextBitArray, pos+1)
}


const oxyRating = parseInt(oxyGeneratorRating(allNumbers), 2);
const co2Rating = parseInt(co2GeneratorRating(allNumbers), 2);
console.log(`oxyRating=${oxyRating}, co2Rating=${co2Rating}, result=${oxyRating*co2Rating}`)
