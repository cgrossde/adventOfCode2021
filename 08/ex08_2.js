const fs = require("fs");
const data = fs.readFileSync('input.txt', 'utf8').split("\n").filter(f => f !== "");

const NUMBER_MAP = {
    "abcefg": "0",
    "cf": "1",
    "acdeg": "2",
    "acdfg": "3",
    "bcdf": "4",
    "abdfg": "5",
    "abdefg": "6",
    "acf": "7",
    "abcdefg": "8",
    "abcdfg": "9"
}

function decodeDigitChars(entry) {
    entry.decodedDigits = entry.digits.map(d => d.map(c => entry.pattern.inverseMap[c]).sort().join(""));
    return entry
}

const sum = data.map(d => {
    let [patterns, digits] = d.split(" | ").map(val => val.split(" ").map(e => e.split("")))
    return {pattern: preprocessPatterns(patterns), digits}
}).map(decodeCharacterMap)
    .map(decodeDigitChars)
    .map(convertDecodedDigitToNumber)
    .reduce((sum, val) => sum + val, 0)

function convertDecodedDigitToNumber(entry) {
    return parseInt(entry.decodedDigits.map(d => NUMBER_MAP[d]).join(""));
}

function decodeCharacterMap(entry) {
    const pattern = entry.pattern;
    const char = pattern.map;
    // infer "a" => Compare 7 to 1
    char.a = existsOnlyOnce(pattern[7], pattern[1])[0]
    const cde = missingAtLeastOnce(...pattern.zeroSixOrNine)
    const bcef = missingAtLeastOnce(...pattern.twoThreeOrFive)
    // infer "d" => d is in cde but not in bcef
    char.d = substractBfromA(cde, bcef)[0]
    // infer "e or g" => a,d are known. [e,g] = 8 - 4 - d - a
    const eg = substractBfromA(pattern[8], [...pattern[4], char.a, char.d])
    char.e = intersection(eg, cde)[0]
    char.g = existsOnlyOnce(eg, [char.e])[0]
    char.c = substractBfromA(cde, [char.e, char.d])[0]
    char.f = substractBfromA(pattern[1], [char.c])[0]
    char.b = substractBfromA(pattern[4], [char.c, char.d, char.f])[0]
    pattern.inverseMap = {} // because we need to convert in the other direction
    Object.keys(char).forEach(c => pattern.inverseMap[char[c]] = c)
    return entry;
}

function intersection(...arrays) {
    const map = {}
    arrays.forEach(array => array.forEach(char => {
        map[char] = ++map[char] || 1
    }))
    return Object.keys(map).filter(char => map[char] === arrays.length)
}

function missingAtLeastOnce(...arrays) {
    const map = {}
    arrays.forEach(array => array.forEach(char => {
        map[char] = ++map[char] || 1
    }))
    return Object.keys(map).filter(char => map[char] < arrays.length)
}

function existsOnlyOnce(array1, array2) {
    return [...substractBfromA(array1, array2), ...substractBfromA(array2, array1)]
}

function substractBfromA(a, b) {
    return a.filter(a => b.indexOf(a) === -1)
}

function preprocessPatterns(patterns) {
    const result = {
        zeroSixOrNine: [], twoThreeOrFive: [], map: {}
    }
    patterns.forEach(p => {
        switch (p.length) {
            case 2:
                result[1] = p
                break
            case 3:
                result[7] = p
                break
            case 4:
                result[4] = p
                break
            case 7:
                result[8] = p
                break
            case 5:
                result.twoThreeOrFive.push(p)
                break
            case 6:
                result.zeroSixOrNine.push(p)
        }
    })
    return result
}

// 1068933
console.log(sum)


