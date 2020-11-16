const Jimp = require("jimp")
module.exports = {
    name: 'sobel',
    category: 'img',
    description: '',
    run: async (message, args, client, prefix, command) => {
        let attachments = message.attachments.array()
        if (attachments.length === 0) return message.reply("Please upload an image, the caption should be this command.")
        if (attachments.length > 1) return message.reply("One image please!")
        console.log(attachments[0].url)

        if (!args[0]) return message.reply("Which direction? Left, right, top or bottom?")
        if (args[1]) return message.reply("One direction please.")

        if (args[0] === "top") {
            Jimp.read(`${attachments[0].url}`, (err, lenna) => {
                if (err) throw err

                lenna.convolute([
                    [1, 0, -1],
                    [2, 0, -2],
                    [1, 0, -1]
                ]).write("./image cache/sobel/modifiedIMG.png")

                message.channel.send(``, {
                    files: ["./image cache/sobel/modifiedIMG.png"]
                })
            })
        } else if (args[0] === "bottom") {
            Jimp.read(`${attachments[0].url}`, (err, lenna) => {
                if (err) throw err

                lenna.convolute([
                    [-1, 0, 1],
                    [-2, 0, 2],
                    [-1, 0, 1]
                ]).write("./image cache/sobel/modifiedIMG.png")

                message.channel.send(``, {
                    files: ["./image cache/sobel/modifiedIMG.png"]
                })
            })
        } else if (args[0] === "right") {
            Jimp.read(`${attachments[0].url}`, (err, lenna) => {
                if (err) throw err

                lenna.convolute([
                    [-1, -2, -1],
                    [0, 0, 0],
                    [1, 2, 1]
                ]).write("./image cache/sobel/modifiedIMG.png")

                message.channel.send(``, {
                    files: ["./image cache/sobel/modifiedIMG.png"]
                })
            })
        } else if (args[0] === "left") {
            Jimp.read(`${attachments[0].url}`, (err, lenna) => {
                if (err) throw err

                lenna.convolute([
                    [1, 2, 1],
                    [0, 0, 0],
                    [-1, -2, -1]
                ]).write("./image cache/sobel/modifiedIMG.png")

                message.channel.send(``, {
                    files: ["./image cache/sobel/modifiedIMG.png"]
                })
            })
        }
    }
}