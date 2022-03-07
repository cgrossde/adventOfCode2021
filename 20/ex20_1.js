const fs = require("fs")

let [ENHANCEMENT_MAP, imageData] = fs.readFileSync('input.txt', 'utf8')
    .split("\n\n")

imageData = imageData.split("\n").filter(s => s !== "\n")

class Image {
    constructor(width, height, padding, imageData) {
        this.width = width;
        this.height = height;
        this.padding = padding;
        this.pixels = {}
        this.missingPlaceholder = "."
        if (imageData)
            this.readImageData(imageData)
    }

    readImageData(imageData) {
        for (let y = 0; y < imageData.length; y++) {
            for (let x = 0; x < imageData[0].length; x++) {
                const xp = x + PADDING, yp = y + PADDING
                this.pixels[xp + "," + yp] = imageData[y][x]
            }
        }
    }

    print() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.pixels[x + "," + y] && this.pixels[x + "," + y] === "#")
                    process.stdout.write("# ")
                else
                    process.stdout.write(". ")
            }
            process.stdout.write("\n")
        }
    }

    getPixelsAround(x, y) {
        return this.getPixel(x - 1, y - 1) + this.getPixel(x, y - 1) + this.getPixel(x + 1, y - 1)
            + this.getPixel(x - 1, y) + this.getPixel(x, y) + this.getPixel(x + 1, y)
            + this.getPixel(x - 1, y + 1) + this.getPixel(x, y + 1) + this.getPixel(x + 1, y + 1)
    }

    getPixel(x, y) {
        if (!this.pixels[x + "," + y])
            this.pixels[x + "," + y] = this.missingPlaceholder
        return (this.pixels[x + "," + y] && this.pixels[x + "," + y] === "#") ? "1" : "0"
    }

    clone() {
        const newImage = new Image(this.width, this.height, this.padding - 1)
        newImage.pixels = {...this.pixels}
        return newImage;
    }

    enhance() {
        if (this.padding === 0)
            throw new Error("No padding left, increase padding before enhancing more")
        const newImage = this.clone()
        const offset = this.padding - 1
        for (let y = offset; y < this.height - offset; y++) {
            for (let x = offset; x < this.width - offset; x++) {
                const pixelValue = this.getPixelsAround(x, y)
                const enhancedPixel = ENHANCEMENT_MAP[parseInt(pixelValue, 2)];
                newImage.pixels[x + "," + y] = enhancedPixel
            }
        }
        return newImage;
    }

    countPixels() {
        let count = 0;
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.pixels[x + "," + y] && this.pixels[x + "," + y] === "#")
                    count++
            }
        }
        return count
    }

}

// Create image array but pad it with darkness
const PADDING = 4;
const HEIGHT = PADDING * 2 + imageData.length
const WIDTH = PADDING * 2 + imageData[0].length
const image = new Image(WIDTH, HEIGHT, PADDING, imageData)
const firstEnhance = image.enhance()
firstEnhance.missingPlaceholder = "#"
const doubleEnhance = firstEnhance.enhance()

// 5473 => Too high, 5324 => ?
console.log("PIXEL COUNT", doubleEnhance.countPixels())
