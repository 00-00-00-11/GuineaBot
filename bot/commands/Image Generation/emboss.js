const Jimp = require("jimp")
module.exports = {
    name: 'emboss',
    minArgs: 0,
    maxArgs: 0,
    syntaxError: "You provided invalid syntax. Valid syntax for this command is `{PREFIX}{COMMAND} <image>`",
    description: "add emboss to a image",
    run: async (message, args, client, prefix, command) => {
        let attachments = message.attachments.array()
        console.log(attachments[0].url)

        Jimp.read(`${attachments[0].url}`, (err, lenna) => {
            if (err) throw err

            lenna.convolute([
                [-2, -1, 0],
                [-1, 1, 1],
                [0, 1, 2]
            ]).write("./image cache/emboss/modifiedIMG.png")

            message.channel.send(``, {
                files: ["./image cache/emboss/modifiedIMG.png"]
            })
        })
    }
}