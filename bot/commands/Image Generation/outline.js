const Jimp = require("jimp")
module.exports = {
    name: 'outline',
    minArgs: 0,
    maxArgs: 0,
    description: "Detect edges in an image",
    category: "Images",
    run: async (message, args, text, client, prefix, instance) => {
        let attachments = message.attachments.array()
        if (attachments.length === 0) return message.reply("Please upload an image, the caption should be this command.")
        if (attachments.length > 1) return message.reply("One image please!")
        console.log(attachments[0].url)

        Jimp.read(`${attachments[0].url}`, (err, lenna) => {
            if (err) throw err

            lenna.convolute([
                [-1, -1, -1],
                [-1, 8, -1],
                [-1, -1, -1]
            ]).write("./image cache/outline/modifiedIMG.png")

            message.channel.send(``, {
                files: ["./image cache/outline/modifiedIMG.png"]
            })
        })
    }
}