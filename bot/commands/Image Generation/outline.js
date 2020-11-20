const Jimp = require("jimp")
module.exports = {
    name: 'outline',
    minArgs: 0,
    maxArgs: 0,
    syntaxError: "You provided invalid syntax. Valid syntax for this command is `{PREFIX}{COMMAND} <image>`.",
    description: "same as detecting edges",
    run: async (message, args, client, prefix, command) => {
        let attachments = message.attachments.array()
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