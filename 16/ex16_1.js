const fs = require("fs")

// INCOMPLETE

const string = fs.readFileSync('example-input.txt', 'utf8')
    .split("")
    .filter(s => s !== "\n")
const numberInput = string
    .map(s => parseInt(s, 16))
const binaryInput = string
    .map(s => parseInt(s, 16).toString(2).padStart(4, "0"))

function decode(packet) {
    const version = parseInt(packet.slice(0, 3), 2)
    const typeId = parseInt(packet.slice(3, 6), 2)
    if (typeId === 4) {
        const content = packet.slice(6)
        const value = parseInt(content.match(/.{5}/g).map(s => s.slice(1, 5)).join(""), 2)
        return {version, typeId, content, value}
    }
    else { // Operator packet
        const lengthType = packet.slice(6, 7)
        if (lengthType === "0") {
            const subPackageSize = parseInt(packet.slice(7, 22), 2)
            const subPackets = packet.slice(22, 22 + subPackageSize)
            value = subPackets
        } else {
            // If the length type ID is 1, then the next 11 bits are a number that represents the number of sub-packets immediately contained by this packet.
        }
    }
    return {version, typeId, content, value}
}

const PACKAGE_REGEX = /([01]{3})([01]{3})((1[01]{4})*(0[01]{4}))/g

function getSubPackages(binaryContent) {
    return [...binaryContent.matchAll(PACKAGE_REGEX)].map(p => {
            const version = parseInt(p[1], 2)
            const typeId = parseInt(p[2], 2)
        console.log(p)
            const content = p[3].match(/.{5}/g).map(s => s.slice(1, 5)).join("")
            return {
                version, typeId, content
            }
        }
    )
}

console.log(numberInput)
console.log(binaryInput)
console.log(binaryInput.join(""))
console.log(decode(binaryInput.join("")))
console.log(decode("00111000000000000110111101000101001010010001001000000000"))
console.log(getSubPackages("110100101111111000101000"))







