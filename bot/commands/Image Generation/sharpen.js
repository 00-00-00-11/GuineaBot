const Jimp = require("jimp")
module.exports = {
    name: 'sharpen',
    category: 'img',
    description: '',
    run: async (message, args, client, prefix, command) => {
        let attachments = message.attachments.array()
        if (attachments.length === 0) return message.reply("Please upload an image, the caption should be this command.")
        if (attachments.length > 1) return message.reply("One image please!")
        console.log(attachments[0].url)

        Jimp.read(`${attachments[0].url}`, (err, lenna) => {
            if (err) throw err

            lenna.convolute([
                [0, -1, 0],
                [-1, 5, -1],
                [0, -1, 0]
            ]).write("./image cache/sharpen/modifiedIMG.png")

            message.channel.send(``, {
                files: ["./image cache/sharpen/modifiedIMG.png"]
            })
        })
    }
}